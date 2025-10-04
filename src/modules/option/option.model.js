const { default: mongoose } = require("mongoose");

const optionsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  key: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["number", "string", "array", "boolean"],
  },
  enum: { type: Array, default: [] },
  guid: { type: String, required: false },
  category: { type: mongoose.Types.ObjectId, ref: "Category", required: false },
});
const optionModel = mongoose.model("Option", optionsSchema);

module.exports = optionModel;
