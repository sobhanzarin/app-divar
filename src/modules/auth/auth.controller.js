const UserModel = require("../user/user.model");
const AuthService = require("./auth.service");
const authoBind = require("auto-bind");
const { authMessage } = require("./auth.messages");
const NodeEnv = require("../../common/constanst/env.enum");
const cookieName = require("../../common/constanst/cookie.enum");
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
      return res
        .cookie(cookieName.AccessToken, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV == NodeEnv.Production,
        })
        .status(200)
        .json({
          message: authMessage.loginSuccessfully,
        });
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      return res.clearCookie(cookieName.AccessToken).status(200).json({
        message: authMessage.logout,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
