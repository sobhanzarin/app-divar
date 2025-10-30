const autoBind = require("auto-bind");
const postService = require("./post.service");
const CategoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const postMessage = require("./post.message");
const { Types } = require("mongoose");
const { getAddressDetails } = require("../../common/utils/api-service");
const { removePropertyInObject } = require("../../common/utils/functions");
const utf8 = require("utf8");

class PostController {
  #service;
  #success_message;
  constructor() {
    autoBind(this);
    this.#service = postService;
  }
  async createPostPage(req, res, next) {
    try {
      let { slug } = req.query;
      let showBack = false;
      let options, category;
      let match = { parent: null };
      if (slug) {
        slug = slug.trim();
        category = await CategoryModel.findOne({ slug });
        if (!category) throw new createHttpError.NotFound(postMessage.NotFound);
        options = await this.#service.getCategoryOption(category._id);
        if (options.length === 0) options = null;
        showBack = true;
        match = {
          parent: category._id,
        };
      }
      const categories = await CategoryModel.aggregate([
        {
          $match: match,
        },
      ]);

      return res.render("./pages/panel/create-post.ejs", {
        categories,
        showBack,
        category: category?._id,
        options,
      });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      const userId = req.user._id;
      const images = req.files?.map((image) => image?.path?.slice(7));
      const { title_post: title, content, lat, lng, category } = req.body;
      const { city, province, neighborhood } = await getAddressDetails(
        lat,
        lng
      );
      const options = removePropertyInObject(req.body, [
        "title_post",
        "content",
        "lat",
        "lng",
        "category",
      ]);
      for (let key in options) {
        let value = options[key];
        delete options[key];
        key = utf8.decode(key);
        options[key] = value;
      }

      await this.#service.create({
        title,
        userId,
        content,
        images,
        options,
        coordinate: [lat, lng],
        category: new Types.ObjectId(category),
        province,
        city,
        neighborhood,
      });
      await this.#service.find(userId);
      this.#success_message = postMessage.created;
      res.redirect("/post/my-posts");
    } catch (error) {
      next(error);
    }
  }
  async findMyPosts(req, res, next) {
    try {
      const userId = req.user._id;
      const posts = await this.#service.find(userId);
      res.render("./pages/panel/posts.ejs", {
        posts,
        success_message: this.#success_message,
      });
      this.#success_message = null;
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      this.#success_message = postMessage.delete;
      await this.#service.delete(id);
      res.redirect("/post/my-posts");
    } catch (error) {
      next(error);
    }
  }
  async showPost(req, res, next) {
    try {
      const { id } = req.params;
      const post = await this.#service.checkExistId(id);
      res.locals.layout = "./layouts/website/main.ejs";
      res.render("./pages/home/post.ejs", { post });
    } catch (error) {
      next(error);
    }
  }
  async findAll(req, res, next) {
    try {
      const query = req.query;
      console.log(query);
      const posts = await this.#service.postAll(query);
      res.locals.layout = "./layouts/website/main.ejs";
      res.render("./pages/home/index.ejs", { posts });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
