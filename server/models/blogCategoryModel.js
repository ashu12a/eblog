import mongoose from "mongoose";

const blogCategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subCategories: [
      {
        type: String,
      }
    ],
  },
  { timestamps: true }
);

const BlogCategory = mongoose.model("BlogCategory", blogCategorySchema);

export default BlogCategory;
