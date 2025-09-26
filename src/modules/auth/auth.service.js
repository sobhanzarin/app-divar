const authoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const createHttpError = require("http-errors");
const { authMessage } = require("./auth.messages");
const { randomInt } = require("crypto");
class AuthService {
  #model;
  constructor() {
    authoBind(this);
    this.#model = UserModel;
  }
  async sendOTP(mobile) {
    const user = await this.#model.findOne({ mobile });
    const now = new Date().getTime();
    const otp = {
      code: randomInt(10000, 99999),
      expiresIn: (expiresIn = now + 1000 * 60 * 2),
    };
    if (!user) {
      const newUser = await this.UserModel.create({
        mobile,
        otp,
      });
      return newUser;
    }
    if (user.otp && user.otp.expiresIn > now) {
      throw new createHttpError.BadRequest(authMessage.otpCodeNotExpired);
    }
    user.otp = otp;
    await user.save();
    return user;
  }
  async checkOTP(mobile, code) {}
  async checkExistByMobile(mobile) {
    const user = await this.#model.findOne({ mobile });
    if (!user) throw new createHttpError.NotFound(authMessage.NotFound);
    return user;
  }
}

module.exports = new AuthService();
