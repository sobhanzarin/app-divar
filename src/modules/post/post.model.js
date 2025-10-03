const { default: mongoose } = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
  province: { type: String, required: true },
  city: { type: String, required: true },
  neighborhood: { type: String, required: true },
  coordinate: { type: [number], required: true },
  images: { type: [String], required: true },
});
coordin;
const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
