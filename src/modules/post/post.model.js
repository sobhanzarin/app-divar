const { mongoose } = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    province: { type: String, required: false },
    city: { type: String, required: false },
    neighborhood: { type: String, required: false },
    coordinate: { type: [Number], required: true },
    images: { type: [String], required: true },
    option: { type: Object, default: {} },
  },
  {}
);
const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
