const autoBind = require("auto-bind");
const PostModel = require("./post.model");
const optionModel = require("../option/option.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const postMessage = require("./post.message");
const CategoryModel = require("../category/category.model");

class PostService {
  #model;
  #optionModel;
  #categoryModel;
  constructor() {
    autoBind(this);
    this.#model = PostModel;
    this.#optionModel = optionModel;
    this.#categoryModel = CategoryModel;
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
    const [post] = await this.#model.aggregate([
      { $match: { _id: new Types.ObjectId(postId) } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
      {
        $addFields: {
          userMobile: "$user.mobile",
        },
      },
      {
        $project: {
          user: 0,
        },
      },
    ]);
    if (!post) throw new createHttpError.NotFound(postMessage.notFound);
    return post;
  }
  async delete(postId) {
    await this.checkExistId(postId);
    return await this.#model.deleteOne({ _id: postId });
  }
  async postAll(options) {
    try {
      console.log(options);
      let { category, search } = options;
      let query = {};
      if (category) {
        const result = await this.#model.findOne({ slug: category });
        console.log(result);
        if (result) {
          query["category"] = result._id;
        } else {
          return [];
        }
        console.log(result);
      }
      if (search) {
        search = new RegExp(search, "ig");
        query["$or"] = [{ title: search }, { description: search }];
      }
      const posts = await this.#model.find(query, {}, { sort: { _id: -1 } });
      return posts;
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostService();
