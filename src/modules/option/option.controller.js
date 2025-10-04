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
      const { title, category, type, key, enum: list, guid } = req.body;
      console.log({ title, category, type, key, enum: list, guid });
      const newOption = await this.#service.create({
        title,
        category,
        type,
        key,
        enum: list,
        guid,
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
      const options = await this.#service.find({}, { _v: 0 });
      return options;
    } catch (error) {
      next(error);
    }
  }
  async findById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async findByCategoryId(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new optionController();
