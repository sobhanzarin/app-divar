const autoBind = require("auto-bind");
const CategoryService = require("./category.service");
const httpCodes = require("http-codes");
const categoryMessage = require("./category.message");

class CategoryController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = CategoryService;
  }
  async create(req, res, next) {
    try {
      const { name, slug, icon, parent } = req.body;
      await this.#service.create({ name, slug, icon, parent });
      return res.status(httpCodes.CREATED).json({
        message: categoryMessage.created,
        data: newCategory,
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      const categorys = await this.#service.find();
      return res.json(categorys);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
