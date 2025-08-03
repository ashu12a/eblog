import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { NotifySuccess, NotifyWarning } from "../../../utils/Notify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { generateSlug } from "../../../utils/Helper";

export default function CreatePosts() {
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const [subCategory, setSubCategory] = useState([]);

  const editor = useRef(null);
  const content = useRef("");

  // *************** Handle thumbnail **************
  const [thumbnail, setThumbnail] = useState(null);

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  // ***************** Generate Slug **********************
  const [slug, setSlug] = useState("");

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

  // ***************** Handle Form Submission **********************
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const formData = new FormData();

    // Append other fields to the FormData object
    formData.append("title", e.target.title.value);
    formData.append("slug", e.target.slug.value);
    formData.append("author", user._id);
    formData.append("excerpt", e.target.excerpt.value);
    formData.append("category", e.target.category.value);
    formData.append("subcategory", e.target.subcategory.value);
    formData.append("label", e.target.label.value);
    formData.append("status", e.target.status.value);
    formData.append("content", content.current);

    // Append the thumbnail image if available
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    } else {
      NotifyWarning("Please select a thumbnail image");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/blog`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      NotifySuccess("Post created successfully");
      navigate("/posts");
    } catch (e) {
      NotifyWarning(e?.response?.data?.message || "Something went wrong");
    }
  };

  // ********* Refresh Catgeories *********
  const RefreshCategories = () => {
    fetchAllBlogCategories();
    NotifySuccess("Categories refreshed successfully");
  };

  // ********* Handle Filter Subcategories ******
  const handleFilterSubCategories = (value) => {
    setSubCategory(
      categories?.filter((p) => p._id === value)[0]?.subCategories
    );
  };

  return (
    <div className="p-2">
      <div>
        <h2 className="font-semibold text-xl text-neutral-500">Add New Post</h2>
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
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              className="w-full border border-neutral-200 outline-none px-4 py-2 rounded"
              required
            />
          </div>
          <div className="my-2">
            <label>
              Slug{" "}
              <span className="text-xs text-red-600 px-2">
                {" "}
                (should be unique)
              </span>
            </label>
            <input
              type="text"
              value={slug}
              name="slug"
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              className="w-full border border-neutral-200 outline-none px-4 py-2 rounded text-blue-500 underline"
            />
          </div>
          <div className="my-2">
            <label>Excerpt </label>
            <input
              type="text"
              name="excerpt"
              className="w-full border border-neutral-200 outline-none px-4 py-2 rounded"
              required
            />
          </div>
          <div className="my-2">
            <label>Content </label>
            <JoditEditor
              ref={editor}
              value={content.current}
              onChange={(val) => (content.current = val)}
              config={{
                placeholder: "Start writing your blog...",
                height: 400,
                readonly: false,
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
              onChange={(e) => handleFilterSubCategories(e.target.value)}
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
              required
              name="subcategory"
            >
              <option value=""> --select--</option>
              {subCategory?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label>Label</label>
            <select
              className="w-full border border-neutral-200 outline-none px-4 py-2 rounded"
              required
              name="label"
            >
              <option value=""> --select--</option>
              <option value="featured">Featured</option>
              <option value="trending">Trending</option>
              <option value="latest" selected>Latest</option>
              <option value="popular">Popular</option>
            </select>
          </div>

          <div className="my-2">
            <label>Thumbnail</label>
            <div className="relative overflow-hidden">
              <img
                src={
                  (thumbnail && URL.createObjectURL(thumbnail)) ||
                  "https://dummyimage.com/500x300/f5f5f5"
                }
                alt="banner"
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

          <div className="my-2 p-1 ">
            <label>Create Post</label>{" "}
            <select
              className="w-full border border-neutral-200 outline-none px-4 py-2 rounded"
              required
              name="status"
            >
              <option value="draft">Draft</option>
              <option value="publish"> Publish</option>
            </select>
            <div className="flex my-4">
              <button
                type="submit"
                value="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded w-full"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
