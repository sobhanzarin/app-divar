const autoBind = require("auto-bind");
const postService = require("./post.service");

class PostController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = postService;
  }
  async createPostPage(req, res, next) {
    try {
      res.render("./pages/panel/create-post.ejs");
      // res.json("hello");
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
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
}

module.exports = new PostController();
