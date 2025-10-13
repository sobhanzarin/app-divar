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
      const { title, slug, icon, parent } = req.body;
      await this.#service.create({ title, slug, icon, parent });
      return res.status(httpCodes.CREATED).json({
        message: categoryMessage.created,
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      const categorys = await this.#service.find({});
      return res.json(categorys);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.delete(id);
      return res.json({
        message: categoryMessage.Deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
