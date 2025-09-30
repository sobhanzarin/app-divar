const authoBind = require("auto-bind");
const userService = require("./user.service");
const createHttpError = require("http-errors");
const { userMessage } = require("./user.messages");
class UserController {
  #service;
  constructor() {
    authoBind(this);
    this.#service = userService;
  }
  async whoami(req, res, next) {
    try {
      const user = req.user;
      if (!user)
        throw new createHttpError.Unauthorized(userMessage.NotFoundAccess);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
