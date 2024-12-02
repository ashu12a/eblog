import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    thumbnail: { type: String, required: true },
    excerpt: { type: String },
    content: { type: String, required: true },
    category:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
    },
    slug: { type: String, required: true, unique: true },
    status: { type: String, default: "draft", enum: ["draft", "publish"] },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
