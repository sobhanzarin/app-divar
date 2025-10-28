const { Router } = require("express");
const PostController = require("./post.controller");
const upload = require("../../common/utils/multer");
const Authorization = require("../../common/guard/authorization.guard");

const router = Router();
router.get("/create", Authorization, PostController.createPostPage);
router.delete("/delete/:id", Authorization, PostController.delete);
router.get("/my-posts", Authorization, PostController.findMyPosts);
router.post(
  "/create",
  Authorization,
  upload.array("images", 10),
  PostController.create
);
router.get("/:id", PostController.showPost);
module.exports = {
  postRouter: router,
};
