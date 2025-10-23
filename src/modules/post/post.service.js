const autoBind = require("auto-bind");
const PostModel = require("./post.model");
const optionModel = require("../option/option.model");

class PostService {
  #model;
  #optionModel;
  constructor() {
    autoBind(this);
    this.#model = PostModel;
    this.#optionModel = optionModel;
  }
  async getCategoryOption(categoryId) {
    const options = await this.#optionModel.find({ category: categoryId });
    return options;
  }
  async create(postDto) {
    return await this.#model.create(postDto);
  }
}

module.exports = new PostService();
