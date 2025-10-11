const { Router } = require("express");
const { AuthRouter } = require("./modules/auth/auth.routes");
const { UserRouter } = require("./modules/user/user.routes");
const { CategoryRouter } = require("./modules/category/category.routes");
const { ooptionRouter } = require("./modules/option/option.routes");

const mainRouter = Router();
mainRouter.use("/auth", AuthRouter);
mainRouter.use("/user", UserRouter);
mainRouter.use("/category", CategoryRouter);
mainRouter.use("/option", ooptionRouter);
mainRouter.get("/", (req, res) => {
  res.locals.layout = "./layouts/website/main.ejs";
  res.render("./pages/home/index.ejs");
});
mainRouter.get("/dashbord", (req, res) => {
  res.render("./pages/panel/dashbord.ejs");
});
module.exports = mainRouter;
