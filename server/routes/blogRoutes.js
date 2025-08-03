import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  allBlogCategory,
  allBlogs,
  allBlogWithCategories,
  createBlog,
  createBlogCategory,
  createBlogComment,
  deleteBlog,
  deleteBlogCategory,
  deleteBlogComment,
  getBlogCommentByPostSlug,
  getBlogComments,
  getBlogsBySubcat,
  getOneBlog,
  getOneBlogBySlug,
  updateBlog,
  updateBlogCategory,
  updateStatusComment,
} from "../controllers/blogController.js";
import { upload } from "../config/multer.js";

const blogRoutes = express.Router();

blogRoutes.get("/", allBlogs); // public route

blogRoutes.get("/one/:id", getOneBlog); // public route

blogRoutes.get("/slug/:slug", getOneBlogBySlug); // public route

blogRoutes.get("/subcat/:slug", getBlogsBySubcat); // public route

blogRoutes.post("/", [protect, upload.single("thumbnail")], createBlog); // Protected route

blogRoutes.put("/:id", [protect, upload.single("thumbnail")], updateBlog); // Protected route

blogRoutes.delete("/:id", protect, deleteBlog); // Protected route

blogRoutes.get("/category-posts", allBlogWithCategories); // public route

// ****************************************************************

blogRoutes.get("/category", allBlogCategory); // public route

blogRoutes.post("/category", protect, createBlogCategory); // Protected route

blogRoutes.put("/category/:id", protect, updateBlogCategory); // Protected route

blogRoutes.delete("/category/:id", protect, deleteBlogCategory); // Protected route

// ******************************************************************

blogRoutes.post("/comment", createBlogComment); // public route

blogRoutes.get("/comment/post/:slug", getBlogCommentByPostSlug); // Protected route

blogRoutes.get("/comment", protect, getBlogComments); // Protected route

blogRoutes.put("/comment/:id", protect, updateStatusComment); // Protected route

blogRoutes.delete("/comment/:id", protect, deleteBlogComment); // Protected route

export default blogRoutes;
