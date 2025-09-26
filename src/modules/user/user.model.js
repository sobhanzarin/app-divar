const { default: mongoose, mongo } = require("mongoose");

const OtpSchema = new mongoose.Schema({
  code: { type: String, required: false, default: undefined },
  expiresIn: { type: Number, required: false, default: 0 },
});

const UserSchema = new mongoose.Schema({
  fullName: { type: String },
  mobile: { type: String, unique: true, required: true },
  otp: { type: OtpSchema },
  verifiedMobile: { type: Boolean, default: false, required: true },
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
