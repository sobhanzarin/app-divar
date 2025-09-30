const jwt = require("jsonwebtoken");
const authorizationMessage = require("../messages/auth.message");
const createHttpError = require("http-errors");
const UserModel = require("../../modules/user/user.model");
require("dotenv").config();

const Authorization = async (req, res, next) => {
  try {
    const token = req?.cookies?.access_token;
    if (!token)
      throw new createHttpError.Unauthorized(authorizationMessage.loginAgain);
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (verifyToken.id) {
      const user = await UserModel.findById(
        { _id: verifyToken.id },
        { verifiedMobile: 0, otp: 0, accessToken: 0, updatedAt: 0, __v: 0 }
      );
      if (!user)
        throw createHttpError.Unauthorized(
          authorizationMessage.notFoundAccount
        );
      req.user = user;
      return next();
    }
    throw new createHttpError.Unauthorized(authorizationMessage.invalidToken);
  } catch (error) {
    next(error);
  }
};

module.exports = Authorization;
