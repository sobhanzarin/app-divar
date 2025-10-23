const autoBind = require("auto-bind");
const postService = require("./post.service");
const CategoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const postMessage = require("./post.message");
const httpCodes = require("http-codes");
const { Types } = require("mongoose");
const { default: axios } = require("axios");

class PostController {
  #service;
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
      res.render("./pages/panel/create-post.ejs", {
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
      const {
        title_post: title,
        content,
        images,
        lat,
        lng,
        category,
      } = req.body;
      const resultMap = await axios
        .get(`${process.env.MAP_IR_URL_API}?lat=${lat}&lon=${lng}`, {
          headers: {
            "x-api-key": process.env.MAP_API_KEY,
          },
        })
        .then((res) => res.data);
      console.log(resultMap);
      delete req.body["title_post"];
      delete req.body["description"];
      delete req.body["images"];
      delete req.body["lat"];
      delete req.body["lng"];
      delete req.body["category"];
      const option = req.body;
      const newPost = await this.#service.create({
        title,
        content,
        images: [],
        coordinate: [lat, lng],
        category: new Types.ObjectId(category),
        option,
        // address: resultMap.address,
        province: resultMap.province,
        city: resultMap.city,
        neighborhood: resultMap.region,
      });
      console.log(newPost);
      return res.status(httpCodes.CREATED).json({
        message: postMessage.created,
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
}

module.exports = new PostController();
