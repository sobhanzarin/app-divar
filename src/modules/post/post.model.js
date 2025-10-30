const { mongoose, mongo, Types } = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    userId: { type: Types.ObjectId, required: true },
    amount: { type: Number, required: true, default: 0 },
    content: { type: String, required: true },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    province: { type: String, required: false },
    city: { type: String, required: false },
    neighborhood: { type: String, required: false },
    coordinate: { type: [Number], required: false },
    images: { type: [String], required: false },
    options: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);
const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
