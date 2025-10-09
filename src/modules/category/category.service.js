const autoBind = require("auto-bind");
const CategoryModel = require("./category.model");
const createHttpError = require("http-errors");
const categoryMessage = require("./category.message");
const { isValidObjectId, Types } = require("mongoose");
const { default: slugify } = require("slugify");
const optionModel = require("../option/option.model");

class CategoryService {
  #model;
  #optionModel;
  constructor() {
    autoBind(this);
    this.#model = CategoryModel;
    this.#optionModel = optionModel;
  }
  async find() {
    return this.#model.find({}, { parent: { exists: false } });
  }
  async delete(id) {
    const category = await this.checkExistId(id);
    await this.#optionModel.deleteMany({ category: id }).then(async () => {
      await this.#model.deleteMany({ _id: id });
    });
    return true;
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
