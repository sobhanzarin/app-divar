const { mongoose } = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
  province: { type: String, required: true },
  city: { type: String, required: true },
  neighborhood: { type: String, required: true },
  coordinate: { type: [Number], required: true },
  images: { type: [String], required: true },
},
{

});
const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
