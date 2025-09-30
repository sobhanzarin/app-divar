const authoBind = require("auto-bind");
const UserModel = require("../user/user.model");
class UserService {
  #model;
  constructor() {
    authoBind(this);
    this.#model = UserModel;
  }
}

module.exports = new UserService();
