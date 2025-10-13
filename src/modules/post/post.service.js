const autoBind = require("auto-bind");
const PostModel = require("./post.model");
const createHttpError = require("http-errors");
const postMessage = require("./post.message");

class PostService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = PostModel;
  }
  async find() {}
  async create() {}
}

module.exports = new PostService();
