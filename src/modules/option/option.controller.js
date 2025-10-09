const autoBind = require("auto-bind");
const OptionService = require("./option.service");
const httpCodes = require("http-codes");
const optionMessage = require("./option.message");

class optionController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = OptionService;
  }
  async create(req, res, next) {
    try {
      const {
        title,
        category,
        type,
        key,
        enum: list,
        guid,
        required,
      } = req.body;
      console.log({ title, category, type, key, enum: list, guid, required });
      const newOption = await this.#service.create({
        title,
        category,
        type,
        key,
        enum: list,
        guid,
        required,
      });

      console.log(newOption);
      return res.status(httpCodes.CREATED).json({
        message: optionMessage.created,
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      const options = await this.#service.find();
      return res.json(options);
    } catch (error) {
      next(error);
    }
  }
  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const optionId = await this.#service.findById(id);
      return res.send(optionId);
    } catch (error) {
      next(error);
    }
  }
  async deleteById(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.deleteById(id);
      return res.json({
        message: optionMessage.Deleted,
      });
    } catch (error) {
      next(error);
    }
  }
  async findByCategoryId(req, res, next) {
    try {
      const { categoryId } = req.params;
      const optionCategoryId = await this.#service.findByCategoryId(categoryId);
      console.log(optionCategoryId);
      return res.send(optionCategoryId);
    } catch (error) {
      next(error);
    }
  }
  async findByCategorySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const optionbySlug = await this.#service.findByCategorySlug(slug);
      return res.send(optionbySlug);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new optionController();
