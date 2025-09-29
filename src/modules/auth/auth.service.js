const authoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const createHttpError = require("http-errors");
const { authMessage } = require("./auth.messages");
const { randomInt } = require("crypto");
const jwt = require("jsonwebtoken");
class AuthService {
  #model;
  constructor() {
    authoBind(this);
    this.#model = UserModel;
  }
  async sendOTP(mobile) {
    const user = await this.#model.findOne({ mobile });
    const now = new Date().getTime();
    const expiresIn = now + 1000 * 60 * 2;
    const codeOtp = randomInt(10000, 99999);
    if (!user) {
      const newUser = await this.#model.create({
        mobile,
        otp: { code: codeOtp, expiresIn },
      });
      return newUser;
    }
    if (user.otp && user.otp.expiresIn > now) {
      throw new createHttpError.BadRequest(authMessage.otpCodeNotExpired);
    }
    user.otp = { code: codeOtp, expiresIn };
    await user.save();
    return user;
  }
  async checkOTP(mobile, code) {
    const user = await this.checkExistByMobile(mobile);
    const now = new Date().getTime();
    if (user?.otp?.expiresIn < now)
      throw new createHttpError.Unauthorized(authMessage.otpCodeExpired);
    if (user?.otp?.code != code)
      throw new createHttpError.Unauthorized(authMessage.otpIsIncorrect);
    if (!user.verifiedMobile) {
      user.verifiedMobile = true;
    }
    const accessToken = this.signToken({ mobile, id: user.id });
    user.accessToken = accessToken;
    await user.save();
    return accessToken;
  }
  async checkExistByMobile(mobile) {
    const user = await this.#model.findOne({ mobile });
    if (!user) throw new createHttpError.NotFound(authMessage.NotFound);
    return user;
  }
  signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 1000 * 60 * 60 * 24 * 365,
    });
  }
}

module.exports = new AuthService();
