const { Router } = require("express");
const optionController = require("./option.controller");

const router = Router();
router.post("/", optionController.create);
router.post("/by-category/:categoryId", optionController.findByCategoryId);
router.post("/:id", optionController.findById);
router.post("/", optionController.find);

module.exports = {
  ooptionRouter: router,
};
