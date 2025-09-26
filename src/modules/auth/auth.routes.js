const { Router } = require("express");
const authController = require("./auth.controller");

const router = Router();
router.post("/sebd-otp", authController.sendOTP);
router.post("/check-otp", authController.checkOTP);

module.exports = {
  AuthRouter: router,
};
