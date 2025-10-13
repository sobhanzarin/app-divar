const { Router } = require("express");
const CategoryController = require("./post.controller");

const router = Router();
router.get("/create", CategoryController.createPostPage);
module.exports = {
  postRouter: router,
};
