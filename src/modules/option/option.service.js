const autoBind = require("auto-bind");
const optionModel = require("./option.model");
const categoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const optionMessage = require("./option.message");
const { default: slugify } = require("slugify");

class OptionService {
  #model;
  #categoryModel;
  constructor() {
    autoBind(this);
    this.#model = optionModel;
    this.#categoryModel = categoryModel;
  }
  async find() {
    const options = this.#model
      .find({}, { __v: 0 }, { _id: -1 })
      .populate([{ path: "category", select: { name: 1, slug: 1 } }]);
    return options;
  }
  async findById(id) {
    const optionId = await this.#model
      .findById(id, { __v: 0 })
      .populate([{ path: "category", select: { name: 1, slug: 1 } }]);
    return optionId;
  }
  async findByCategoryId(category) {
    return await this.#model
      .find({ category }, { __v: 0 })
      .populate([{ path: "category", select: { name: 1, slug: 1 } }]);
  }
  async create(optionDto) {
    const category = await this.checkExistById(optionDto.category);
    optionDto.category = category._id;
    optionDto.key = slugify(optionDto.key, {
      trim: true,
      replacement: "_",
      lower: true,
    });
    await this.alreadyExistByCategoryAndKey(optionDto.key, optionDto.category);
    if (optionDto.enum && optionDto.enum == "string") {
      optionDto.enum = optionDto.enum.split(",");
    } else if (Array.isArray(optionDto.enum)) optionDto.enum = [];
    const newOption = await this.#model.create(optionDto);
    return newOption;
  }
  async checkExistById(id) {
    const category = await this.#categoryModel.findById(id);
    if (!category) throw new createHttpError.NotFound(optionMessage.NotFound);
    return category;
  }
  async alreadyExistByCategoryAndKey(key, category) {
    const isExist = await this.#model.findOne({ key, category });
    if (isExist) throw new createHttpError.Conflict(optionMessage.alreadyExist);
    return null;
  }
}

module.exports = new OptionService();
