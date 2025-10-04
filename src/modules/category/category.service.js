const autoBind = require("auto-bind");
const CategoryModel = require("./category.model");
const createHttpError = require("http-errors");
const categoryMessage = require("./category.message");
const { isValidObjectId, Types } = require("mongoose");
const { default: slugify } = require("slugify");

class CategoryService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = CategoryModel;
  }
  async find() {
    // return this.#model.find();
    return this.#model.find({}, { parent: { exists: false } });
  }
  async create(categoryData) {
    if (categoryData?.parent && isValidObjectId(categoryData.parent)) {
      const existCategory = await this.checkExistId(categoryData.parent);
      categoryData.parent = existCategory._id;
      categoryData.parents = [
        ...new Set(
          [existCategory._id.toString()]
            .concat(existCategory.parents.map((id) => id.toString()))
            .map((id) => new Types.ObjectId(id))
        ),
      ];
    }

    if (categoryData?.slug) {
      categoryData.slug = slugify(categoryData.slug, { trim: true });
      await this.alreadyExistBySlug(categoryData.slug);
    } else {
      categoryData.slug = slugify(categoryData.name, { trim: true });
    }

    const newCategory = await this.#model.create(categoryData);
    return newCategory;
  }

  async checkExistId(id) {
    const category = await this.#model.findById(id);
    if (!category) throw new createHttpError.NotFound(categoryMessage.notFound);
    return category;
  }

  async checkExistBySlug(slug) {
    const category = await this.#model.findOne({ slug });
    if (!category) throw new createHttpError.NotFound(categoryMessage.notFound);
    return category;
  }

  async alreadyExistBySlug(slug) {
    const category = await this.#model.findOne({ slug });
    if (category)
      throw new createHttpError.Conflict(categoryMessage.alreadyExist);
    return null;
  }
}

module.exports = new CategoryService();
