import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { NotifySuccess, NotifyWarning } from "../../../utils/Notify";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useGlobalLoading } from "../../../context/LoadingContext";


export default function UpdatePosts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useGlobalLoading();
  const [subCategory, setSubCategory] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const content = useRef("");
  const editor = useRef(null);

  // ************** Fetch All Blog Categories *********************
  const [categories, setCategories] = useState([]);
  const fetchAllBlogCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blog/category`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(response.data.data);
    } catch (e) {
      NotifyWarning(e?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchAllBlogCategories();
  }, []);

  // updating blog state
  const [blogData, setBlogData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "",
    subcategory: "",
    label: "",
    content: "",
    status: "draft",
  });
  const { token, user } = useAuth();

  // Thumbnail State
  const [thumbnail, setThumbnail] = useState(null);

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  // Generate Slug
  const generateSlug = (e) => {
    const value = e.target.value;
    const formattedSlug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    setBlogData({ ...blogData, slug: formattedSlug, title: value });
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  // Fetch Existing Post
  const getExistingPost = async () => {
    try {
      startLoading();
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/blog/one/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const post = data?.data;
      setBlogData({
        title: post?.title || "",
        slug: post?.slug || "",
        excerpt: post?.excerpt || "",
        category: post?.category?._id || "",
        subcategory: post?.subcategory || "",
        label: post?.label || "",
        content: post?.content || "",
        status: post?.status || "draft",
      });
      content.current = post?.content || "";
      setThumbnail(post?.thumbnail);
      setSubCategory(post?.category?.subCategories);
    } catch (error) {
      navigate("/posts");
      NotifyWarning(error?.response?.data?.message || "Blog Data Not Found");
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    getExistingPost();
  }, [id]);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("slug", blogData.slug);
    formData.append("author", user._id);
    formData.append("excerpt", blogData.excerpt);
    formData.append("category", blogData.category);
    formData.append("subcategory", blogData.subcategory);
    formData.append("label", blogData.label);
    formData.append("status", blogData.status);
    formData.append("content", content.current);

    if (typeof thumbnail === "object") {
      formData.append("thumbnail", thumbnail);
    }

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/blog/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      NotifySuccess("Post updated successfully");
      navigate("/posts");
    } catch (error) {
      NotifyWarning(error?.response?.data?.message || "Something went wrong");
    } finally{
      setIsloading(false);
    }
  };

  // ********* Refresh Catgeories *********
  const RefreshCategories = () => {
    fetchAllBlogCategories();
    NotifySuccess("Categories refreshed successfully");
  };

  // ********* Handle Filter Subcategories ******
  const handleFilterSubCategories = (e) => {
    handleInputChange(e);
    setSubCategory(
      categories?.filter((p) => p._id === e.target.value)[0]?.subCategories || ""
    );
  };

  return (
    <div className="p-2">
      <div>
        <h2 className="font-semibold text-xl text-neutral-500">Update Post</h2>
      </div>
      <form
        className="grid grid-cols-6 bg-white p-2 my-2 rounded"
        onSubmit={handleSubmit}
      >
        <div className="col-span-4">
          <div className="my-2">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="w-full border border-neutral-200 outline-none px-4 py-2 rounded"
              value={blogData.title}
              onChange={generateSlug}
              required
            />
          </div>
          <div className="my-2">
            <label>Slug</label>
            <input
              type="text"
              name="slug"
              className="w-full border border-neutral-200 outline-none px-4 py-2 rounded text-blue-500 underline"
              value={blogData.slug}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="my-2">
            <label>Excerpt</label>
            <input
              type="text"
              name="excerpt"
              className="w-full border border-neutral-200 outline-none px-4 py-2 rounded"
              value={blogData.excerpt}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="my-2">
            <label>Content</label>
            <JoditEditor
              ref={editor}
              value={content.current}
              onChange={(val) => (content.current = val)}
              config={{
                placeholder: "Start writing your blog...",
                height: 400,
              }}
            />
          </div>
        </div>
        <div className="col-span-2 px-4">
          <div className="-mb-2">
            <label>Category</label>
            <select
              className="w-full border border-neutral-200 outline-none px-4 py-2 rounded"
              required
              onChange={handleFilterSubCategories}
              value={blogData.category}
              name="category"
              multiple={false}
            >
              <option value=""> --select--</option>
              {categories?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
            <p className="text-xs text-right pt-1">
              <span
                className="text-green-600 cursor-pointer"
                onClick={RefreshCategories}
              >
                Refresh
              </span>
            </p>
          </div>

          <div
            className={`mb-4 ${subCategory?.length > 0 ? "block" : "hidden"}`}
          >
            <label>Sub Category</label>
            <select
              className="w-full border border-neutral-200 outline-none px-4 py-2 rounded"
              name="subcategory"
              value={blogData.subcategory || ""}
              onChange={handleInputChange}
            >
              <option value=""> --select--</option>
              {subCategory?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="my-2">
            <label>Label</label>
            <select
              className="w-full border border-neutral-200 outline-none px-4 py-2 rounded"
              required
              name="label"
              value={blogData.label}
              onChange={handleInputChange}
            >
              <option value=""> --select--</option>
              <option value="featured">Featured</option>
              <option value="trending">Trending</option>
              <option value="latest">Latest</option>
              <option value="popular">Popular</option>
            </select>
          </div>
          <div className="my-2">
            <label>Thumbnail</label>
            <div className="relative overflow-hidden">
              <img
                src={
                  typeof thumbnail === "string"
                    ? `${import.meta.env.VITE_STATIC_URL}/public/${thumbnail}` // When thumbnail is a string, it's assumed to be a path
                    : thumbnail && thumbnail !== null
                    ? URL.createObjectURL(thumbnail) // When thumbnail is a file, create a URL for the file object
                    : "https://dummyimage.com/500x300/f5f5f5" // Fallback image if thumbnail is null or undefined
                }
                alt="thumbnail"
                className="border border-gray-200 rounded w-full h-[250px]"
              />
              <input
                type="file"
                onChange={handleThumbnailChange}
                accept=".png, .jpg, .jpeg, .gif, .webp"
                className="absolute top-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
          <div className="my-2 p-1">
            <label>Status</label>
            <select
              name="status"
              className="w-full border border-neutral-200 outline-none px-4 py-2 rounded"
              value={blogData.status}
              onChange={handleInputChange}
              required
            >
              <option value="draft">Draft</option>
              <option value="publish">Publish</option>
            </select>
          </div>
          <div className="flex my-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded w-full"
            >
            {
              isLoading ? 'Loading...' : 'Submit'
            }
              
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
