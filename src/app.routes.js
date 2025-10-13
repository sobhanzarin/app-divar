const { Router } = require("express");
const { AuthRouter } = require("./modules/auth/auth.routes");
const { UserRouter } = require("./modules/user/user.routes");
const { CategoryRouter } = require("./modules/category/category.routes");
const { ooptionRouter } = require("./modules/option/option.routes");
const { postRouter } = require("./modules/post/post.routes");

const mainRouter = Router();
mainRouter.use("/auth", AuthRouter);
mainRouter.use("/user", UserRouter);
mainRouter.use("/category", CategoryRouter);
mainRouter.use("/option", ooptionRouter);
mainRouter.use("/post", postRouter);
mainRouter.get("/", (req, res) => {
  res.locals.layout = "./layouts/website/main.ejs";
  res.render("./pages/home/index.ejs");
});
mainRouter.get("/panel", (req, res) => {
  res.render("./pages/panel/dashbord.ejs");
});
mainRouter.get("/auth/login", (req, res) => {
  res.locals.layout = "./layouts/auth/main.ejs";
  res.render("./pages/auth/login.ejs");
});
module.exports = mainRouter;
