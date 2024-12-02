import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { NotifySuccess, NotifyWarning } from "../../../utils/Notify";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function UpdatePosts() {
  const editor = useRef(null);
  const content = useRef("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "",
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
        category: post?.category || "",
        content: post?.content || "",
        status: post?.status || "draft",
      });
      content.current = post?.content || "";
      setThumbnail(post?.thumbnail);
    } catch (error) {
      navigate("/posts");
      NotifyWarning(error?.response?.data?.message || "Blog Data Not Found");
    }
  };

  useEffect(() => {
    getExistingPost();
  }, [id]);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("slug", blogData.slug);
    formData.append("author", user._id);
    formData.append("excerpt", blogData.excerpt);
    formData.append("category", blogData.category);
    formData.append("status", blogData.status);
    formData.append("content", content.current);

    if (typeof thumbnail === 'object') {
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
    }
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
          <div className="my-2">
            <label>Category</label>
            <select
              name="category"
              className="w-full border border-neutral-200 outline-none px-4 py-2 rounded"
              value={blogData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">--select--</option>
              <option value="Trending">Trending</option>
              <option value="News">News</option>
            </select>
          </div>
          <div className="my-2">
            <label>Thumbnail</label>
            <div className="relative overflow-hidden"> {console.log(thumbnail)}
              <img
                src={
                  typeof thumbnail === "string"
                    ? `${import.meta.env.VITE_STATIC_URL}/public/${thumbnail}` // When thumbnail is a string, it's assumed to be a path
                    : (thumbnail && thumbnail !== null)
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
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded w-full"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
