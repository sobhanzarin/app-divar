const { Router } = require("express");
const router = Router();
const authController = require("./auth.controller");
router.post("/send-otp", authController.sendOTP);
router.post("/check-otp", authController.checkOTP);

module.exports = {
  AuthRouter: router,
};
