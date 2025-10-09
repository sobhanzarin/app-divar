const autoBind = require("auto-bind");
const optionModel = require("./option.model");
const categoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const optionMessage = require("./option.message");
const { default: slugify } = require("slugify");
const CategoryService = require("../category/category.service");
const { isTrue, isFalse } = require("../../common/utils/functions");
const { isValidObjectId } = require("mongoose");

class OptionService {
  #model;
  #categoryService;
  constructor() {
    autoBind(this);
    this.#model = optionModel;
    this.#categoryService = CategoryService;
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
  async deleteById(id) {
    await this.checkExistOption(id);
    return await this.#model.deleteOne({ _id: id });
  }
  async findByCategoryId(category) {
    return await this.#model
      .find({ category }, { __v: 0 })
      .populate([{ path: "category", select: { name: 1, slug: 1 } }]);
  }
  async findByCategorySlug(slug) {
    const options = await this.#model.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $addFields: {
          categorySlug: "$category.slug",
          categoryName: "$category.name",
          categoryIcon: "$category.icon",
        },
      },
      {
        $project: {
          category: 0,
          __v: 0,
        },
      },
      {
        $match: {
          categorySlug: slug,
        },
      },
    ]);
    console.log(options);
    return options;
  }
  async create(optionDto) {
    const category = await this.#categoryService.checkExistId(
      optionDto.category
    );
    optionDto.category = category._id;
    optionDto.key = slugify(optionDto.key, {
      trim: true,
      replacement: "_",
      lower: true,
    });
    await this.alreadyExistByCategoryAndKey(optionDto.key, optionDto.category);
    if (optionDto.enum && optionDto.enum == "string") {
      optionDto.enum = optionDto.enum.split(",");
    } else if (!Array.isArray(optionDto.enum)) optionDto.enum = [];
    if (isTrue(optionDto?.required)) optionDto.required = true;
    if (isFalse(optionDto?.required)) optionDto.required = false;
    const newOption = await this.#model.create(optionDto);
    return newOption;
  }
  async update(id, optionDto) {
    const existOption = await this.checkExistOption(id);
    if (optionDto.category && isValidObjectId(optionDto.category)) {
      const category = await this.#categoryService.checkExistId(
        optionDto.category
      );
      optionDto.category = category._id;
    } else {
      delete optionDto.category;
    }
    if (optionDto.key) {
      optionDto.key = slugify(optionDto.key, {
        trim: true,
        replacement: "_",
        lower: true,
      });
      let categoryId = existOption.category;
      if (optionDto.category) categoryId = optionDto.category;
      await this.alreadyExistByCategoryAndKey(optionDto.key, categoryId);
    } else {
      delete optionDto.key;
    }
    if (optionDto.enum && optionDto.enum == "string") {
      optionDto.enum = optionDto.enum.split(",");
    } else if (!Array.isArray(optionDto.enum)) delete optionDto.enum;

    if (isTrue(optionDto?.required)) optionDto.required = true;
    else if (isFalse(optionDto?.required)) optionDto.required = false;
    else delete optionDto?.required;
    return await this.#model.updateOne({ _id: id }, { $set: optionDtos });
  }
  async checkExistOption(id) {
    const option = await this.#model.findById(id);
    if (!option) throw new createHttpError.NotFound(optionMessage.notFound);
    return option;
  }
  async alreadyExistByCategoryAndKey(key, category) {
    const isExist = await this.#model.findOne({ key, category });
    if (isExist) throw new createHttpError.Conflict(optionMessage.alreadyExist);
    return null;
  }
}

module.exports = new OptionService();
