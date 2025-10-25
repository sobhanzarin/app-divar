const autoBind = require("auto-bind");
const PostModel = require("./post.model");
const optionModel = require("../option/option.model");
const { isValidObjectId } = require("mongoose");
const createHttpError = require("http-errors");
const postMessage = require("./post.message");

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
  async find(userId) {
    if (userId && isValidObjectId(userId))
      return await this.#model.find({ userId });
    throw new createHttpError.BadRequest(postMessage.requestNotValid);
  }
  async checkExistId(postId) {
    if (!postId || !isValidObjectId(postId))
      throw new createHttpError.BadRequest(postMessage.requestNotValid);
    const post = this.#model.findById(postId);
    if (!post) throw new createHttpError.NotFound(postMessage.notFound);
    return post;
  }
  async delete(postId) {
    await this.checkExistId(postId);
    return await this.#model.deleteOne({ _id: postId });
  }
}

module.exports = new PostService();
