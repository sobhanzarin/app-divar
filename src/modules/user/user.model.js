const { default: mongoose } = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
    code: { type: String, required: false, default: undefined },
    expiresIn: { type: Number, required: false, default: 0 },
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    mobile: { type: String, unique: true, required: true },
    otp: { type: OtpSchema },
    verifiedMobile: { type: Boolean, default: false, required: true },
    accessToken: { type: String },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
