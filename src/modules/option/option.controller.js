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
      const { title, content, type, key, enum: list, guid } = req.body;
      await this.#service.OptionService.create({
        title,
        content,
        type,
        key,
        enum: list,
        guid,
      });
      return res.status(httpCodes.CREATED).json({
        message: optionMessage.created,
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
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
