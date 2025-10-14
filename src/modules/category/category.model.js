const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true, index: true },
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
  this.populate([{ path: "children" }]);
  next();
}
categorySchema.pre("find", autoPopulate).pre("findOne", autoPopulate);

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
