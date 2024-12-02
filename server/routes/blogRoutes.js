import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  allBlogCategory,
  allBlogs,
  createBlog,
  createBlogCategory,
  deleteBlog,
  deleteBlogCategory,
  getOneBlog,
  updateBlog,
  updateBlogCategory,
} from "../controllers/blogController.js";
import { upload } from "../config/multer.js";

const blogRoutes = express.Router();

blogRoutes.get("/", allBlogs); // public route

blogRoutes.get("/one/:id", getOneBlog); // public route

blogRoutes.post("/", [protect, upload.single("thumbnail")], createBlog); // Protected route

blogRoutes.put("/:id", [protect, upload.single("thumbnail")], updateBlog); // Protected route

blogRoutes.delete("/:id", protect, deleteBlog); // Protected route

// ****************************************************************

blogRoutes.get("/category", allBlogCategory); // public route

blogRoutes.post("/category", protect, createBlogCategory); // Protected route

blogRoutes.put("/category/:id", protect, updateBlogCategory); // Protected route

blogRoutes.delete("/category/:id", protect, deleteBlogCategory); // Protected route

export default blogRoutes;
