const { Router } = require("express");
const router = Router();
const authController = require("./auth.controller");
const Authorization = require("../../common/guard/authorization.guard");
router.post("/send-otp", authController.sendOTP);
router.post("/check-otp", authController.checkOTP);
router.get("/logout", Authorization, authController.logout);

module.exports = {
  AuthRouter: router,
};
