import Joi from "joi";
import Blog from "../models/blogModel.js";
import { deleteFile } from "../config/multer.js";
import BlogCategory from "../models/blogCategoryModel.js";

// Joi schema for validation
const blogSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required.",
  }),
  author: Joi.string().required().messages({
    "string.empty": "Author is required.",
  }),
  excerpt: Joi.string().allow("").optional(),
  content: Joi.string().allow("").optional(),
  category: Joi.string().default("uncategorized"),
  slug: Joi.string().required().messages({
    "string.empty": "Slug is required.",
  }),
  status: Joi.string().valid("draft", "publish").default("draft").messages({
    "any.only": "Status must be either 'draft' or 'publish'.",
  }),
});

// **************************** Create Blog Post ************************************
export const createBlog = async (req, res, next) => {
  try {
    // Validate request body
    const { error } = blogSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return next(error);
    }

    // Check if blog with the same slug already exists
    const existingBlog = await Blog.findOne({ slug: req.body.slug });
    if (existingBlog) {
      return next(new Error("Blog with the same slug already exists."));
    }

    // upload image
    const image = req.file;
    if (image) {
      req.body.thumbnail = req.file ? `${image.filename}` : null;
    }

    // Create and save the blog
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
};

// **************************** Update Blog Post ************************************
export const updateBlog = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Validate request body
    const { error } = blogSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return next(error);
    }

    // Check if blog with the same slug already exists (excluding the current blog being updated)
    const existingBlog = await Blog.findById(id);

    // Handle image upload (only if a new file is provided)
    const image = req.file;
    if (image) {
      // delete the thumbnail
      if (!deleteFile(existingBlog.thumbnail)) {
        return next(new Error("Thumbnail not found"));
      }
      req.body.thumbnail = image.filename; // Assign the new image filename to the thumbnail field
    }

    // Find the blog by ID and update it
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
    });

    // If no blog is found with the provided ID
    if (!updatedBlog) {
      return next(new Error("Blog not found."));
    }

    // Return the updated blog data
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

// **************************** Get Blog Post ************************************
export const allBlogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 blogs per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    // Retrieve blogs with pagination and exclude content
    const blogs = await Blog.find()
      .select("-content")
      .populate("author")
      .populate("category")
      .skip(skip)
      .limit(limit);

    // Count total documents for pagination metadata
    const total = await Blog.countDocuments();

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

// **************************** Get One Blog Post ************************************
export const getOneBlog = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Retrieve blogs with pagination and exclude content
    const blog = await Blog.findById(id)
      .populate("author")
      .populate("category");

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (err) {
    next(err);
  }
};

// **************************** Delete Blog Post ************************************
export const deleteBlog = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Find the blog post by ID
    const post = await Blog.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // Check and delete the thumbnail if it exists
    if (!deleteFile(post.thumbnail)) {
      return next(new Error("Thumbnail not found"));
    }

    await Blog.findByIdAndDelete(id);
    res.status(201).json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    next(err);
  }
};

// **************************** Create Blog Category  ************************************
export const createBlogCategory = async (req, res, next) => {
  try {
    // Check if blog with the same slug already exists
    const existingBlog = await BlogCategory.findOne({ slug: req.body.slug });
    if (existingBlog) {
      return next(new Error("Category with the same slug already exists."));
    }

    // Create and save the blog
    const data = await BlogCategory.create(req.body);

    res.status(201).json({ success: true, data: data });
  } catch (err) {
    next(err);
  }
};

// **************************** Get Blog Post ************************************
export const allBlogCategory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 blogs per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    // Retrieve blogs with pagination and exclude content
    const blogs = await BlogCategory.find().skip(skip).limit(limit);

    // Count total documents for pagination metadata
    const total = await BlogCategory.countDocuments();

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

// **************************** Delete Blog Category ************************************
export const deleteBlogCategory = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Find the blog post by ID
    const post = await BlogCategory.findById(id);
    if (!post) {
      return next(new Error("Category not found"));
    }

    await BlogCategory.findByIdAndDelete(id);
    res.status(201).json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    next(err);
  }
};

// **************************** Update Blog Category  ************************************
export const updateBlogCategory = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Validate request body
    if (!req.body.title || !req.body.slug) {
      return next(
        new Error("Title and slug fields are not allowed to be updated.")
      );
    }

    // Check if blog with the same slug already exists (excluding the current blog being updated)
    const existingBlog = await BlogCategory.findById(id);
    if (!existingBlog && existingBlog.slug !== req.body.slug) {
      return next(new Error("Category with the same slug already exists."));
    }

    // Find the blog by ID and update it
    const updatedBlog = await BlogCategory.findByIdAndUpdate(id, req.body);

    // If no blog is found with the provided ID
    if (!updatedBlog) {
      return next(new Error("Blog not found."));
    }

    // Return the updated blog data
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};
