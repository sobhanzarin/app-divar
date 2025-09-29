const UserModel = require("../user/user.model");
const AuthService = require("./auth.service");
const authoBind = require("auto-bind");
const { authMessage } = require("./auth.messages");
class AuthController {
  #service;
  constructor() {
    authoBind(this);
    this.#service = AuthService;
  }
  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      await this.#service.sendOTP(mobile);
      return res.json({
        message: authMessage.SendOtpSuccessfullt,
      });
    } catch (error) {
      next(error);
    }
  }
  async checkOTP(req, res, next) {
    try {
      const { mobile, code } = req.body;
      const token = await this.#service.checkOTP(mobile, code);
      return res.json({
        message: authMessage.loginSuccessfully,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
