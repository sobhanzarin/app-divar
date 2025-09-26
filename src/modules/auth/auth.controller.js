const UserModel = require("../user/user.model");
const AuthService = require("./auth.service");
const authoBind = require("auto-bind");
const { authMessage } = require("./auth.messages");
class AuthController {
  #service;
  constructor() {
    this.#service = AuthService;
    authoBind(this);
  }
  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.bod;
      await this.#service.sendOTP(mobile);
      return {
        message: authMessage.SendOtpSuccessfullt,
      };
    } catch (error) {
      next(error);
    }
  }
  async checkOTP(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
