import Joi from "joi";
import Blog from "../models/blogModel.js";
import { deleteFile } from "../config/multer.js";
import BlogCategory from "../models/blogCategoryModel.js";
import BlogComment from "../models/blogCommentModel.js";

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
  subcategory: Joi.string().allow(""),
  slug: Joi.string().required().messages({
    "string.empty": "Slug is required.",
  }),
  label: Joi.string()
    .valid("featured", "trending", "latest", "popular", "top-rated")
    .default("latest")
    .messages({
      "any.only":
        "Label must be either 'featured', 'trending', 'latest', 'popular', or 'top-rated'.",
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
      deleteFile(existingBlog.thumbnail);
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
export const allBlogWithCategories = async (req, res, next) => {
  try {
    const categories = await BlogCategory.find();
    const blogsByCategory = [];

    for (const cat of categories) {
      const blogs = await Blog.find({ category: cat._id })
        .select("-content")
        .populate("author")
        .populate("category")
        .sort({ createdAt: -1 })
        .limit(7);
      
      // Only include categories that have at least 5 posts
      if (blogs.length >= 5) {
        blogsByCategory.push({
          category: cat,
          blogs: blogs
        });
      }
    }

    res.status(200).json({
      success: true,
      data: blogsByCategory,
    });
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
    const label = req.query.label;

    let blogs;
    let total;

    if (label) {
      // Check if label is an array (comma-separated string) or single string
      let labelArray;

      if (label.includes(",")) {
        // If label contains commas, treat as array of labels
        labelArray = label.split(",").map((l) => l.trim());
      } else {
        // Single label
        labelArray = [label];
      }

      // Use aggregation to get limit posts for each label
      const aggregationPipeline = [
        {
          $match: {
            label: { $in: labelArray }
          }
        },
        {
          $sort: { createdAt: -1 }
        },
        {
          $group: {
            _id: "$label",
            blogs: { $push: "$$ROOT" }
          }
        },
        {
          $project: {
            _id: 1,
            blogs: { $slice: ["$blogs", limit] }
          }
        },
        {
          $unwind: "$blogs"
        },
        {
          $replaceRoot: { newRoot: "$blogs" }
        },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author"
          }
        },
        {
          $unwind: {
            path: "$author",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "blogcategories",
            localField: "category",
            foreignField: "_id",
            as: "category"
          }
        },
        {
          $unwind: {
            path: "$category",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            content: 0
          }
        }
      ];

      blogs = await Blog.aggregate(aggregationPipeline);

      // Count total blogs for all labels
      total = await Blog.countDocuments({ label: { $in: labelArray } });
    } else {
      blogs = await Blog.find()
        .select("-content")
        .populate("author")
        .populate("category")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      // Count all blogs
      total = await Blog.countDocuments();
    }

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

// **************************** Get Blog Post  By Sub Category ************************************
export const getBlogsBySubcat = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 blogs per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    // First, try to find a category with the given slug as title
    const category = await BlogCategory.findOne({ title: slug });
    
    let query = {};
    
    if (category) {
      // If category found, search by category ID
      query.category = category._id;
    } else {
      // If no category found, search by subcategory
      query.subcategory = slug;
    }

    // Retrieve blogs with pagination and exclude content
    const blogs = await Blog.find(query)
      .select("-content")
      .populate("author")
      .populate("category")
      .skip(skip)
      .limit(limit);

    // Count total documents for pagination metadata
    const total = await Blog.countDocuments(query);

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
// **************************** Get One Blog Post ************************************
export const getOneBlogBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug;

    // Retrieve blogs with pagination and exclude content
    const blog = await Blog.findOne({ slug })
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

// **************************** Create Post Comment ************************************
export const createBlogComment = async (req, res, next) => {
  try {
    // Check if blog with the same slug already exists
    const existingBlog = await Blog.findById(req.body.post);
    if (!existingBlog) {
      return next(new Error("Blog not found."));
    }

    // Create and save the blog
    const data = await BlogComment.create(req.body);

    res.status(201).json({ success: true, data: data });
    // Return the updated blog data
  } catch (err) {
    next(err);
  }
};

// **************************** Get Post Comment ************************************
export const getBlogCommentByPostSlug = async (req, res, next) => {
  try {
    const postslug = req.params.slug;
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 blogs per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    // finding that blog
    const blogId = await Blog.findOne({ slug: postslug }).select("_id");

    if (blogId === null) {
      return next(new Error("Post not found"));
    }

    // Retrieve blogs with pagination and exclude content
    const blogs = await BlogComment.find({ post: blogId, status: "publish" })
      .sort({ createdAt: -1 })
      .select("-phone -email")
      .skip(skip)
      .limit(limit);

    // Count total documents for pagination metadata
    const total = await BlogComment.countDocuments();

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

// **************************** Get Post Comment ************************************
export const getBlogComments = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 blogs per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    // Retrieve blogs with pagination and exclude content
    const blogs = await BlogComment.find()
      .sort({ createdAt: -1 })
      .populate("post")
      .select("-content")
      .skip(skip)
      .limit(limit);

    // Count total documents for pagination metadata
    const total = await BlogComment.countDocuments();

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

// **************************** Update status of post comment **************************
export const updateStatusComment = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Validate request body
    if (!req.body.status) {
      return next(new Error("Status is required."));
    }

    // Find the blog by ID and update it
    const updatedBlog = await BlogComment.findByIdAndUpdate(id, req.body);

    // If no blog is found with the provided ID
    if (!updatedBlog) {
      return next(new Error("Comment not found."));
    }
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

// ************************* Delete comment ************************************
export const deleteBlogComment = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Find the blog post by ID
    const post = await BlogComment.findById(id);
    if (!post) {
      return next(new Error("Comment not found"));
    }

    await BlogComment.findByIdAndDelete(id);
    res.status(201).json({ success: true, message: "Deleted Successfully" });
    // Return the updated blog data
  } catch (err) {
    next(err);
  }
};
