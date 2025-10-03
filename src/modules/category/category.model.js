const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    icon: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, ref: "Category", required: false },
    parents: {
      type: [mongoose.Types.ObjectId],
      index: true,
      required: false,
      default: [],
    },
  },
  { versionKey: false, id: false, toJSON: { virtuals: true } }
);

categorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

function autoPopulate(next) {
  this.populate([{ path: "childrena" }]);
  next();
}

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
