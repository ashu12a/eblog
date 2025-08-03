import React, { useEffect, useState } from "react";
import PostCategoryTable from "../../components/table/PostCategoryTable";
import axios from "axios";
import { generateSlug } from "../../utils/Helper";
import { NotifySuccess, NotifyWarning } from "../../utils/Notify";
import { useAuth } from "../../context/AuthContext";
import KeywordInput from "../../components/form/inputs/KeywordInput";
import { useGlobalLoading } from "../../context/LoadingContext";


export default function PostCategories() {
  const { token } = useAuth();
  const { startLoading, stopLoading} = useGlobalLoading();

  const [slug, setSlug] = useState();
  const [title, setTitle] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState();
  const [refresh, setRefresh] = useState(0);
  const [isUpdate, setIsUpdate] = useState(null);

  // ************** Fetch All Blog Categories *********************
  const fetchAllBlogCategories = async () => {
    try {
      startLoading();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blog/category?page=${currentPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(response.data);
    } catch (e) {
      NotifyWarning(e?.response?.data?.message || "Unable to fetch Cateogory");
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchAllBlogCategories();
  }, [refresh, currentPage]);

  // ***********************Create and Update Blog Categories *********************
  const createBlogPost = async (e) => {
    e.preventDefault();
    try {
      {
        isUpdate
          ? await axios.put(
              `${import.meta.env.VITE_API_URL}/blog/category/${isUpdate}`,
              { title, slug, subCategories },
              { headers: { Authorization: `Bearer ${token}` } }
            )
          : await axios.post(
              `${import.meta.env.VITE_API_URL}/blog/category`,
              { title, slug, subCategories },
              { headers: { Authorization: `Bearer ${token}` } }
            );
      }
      NotifySuccess(
        `Category ${isUpdate ? "updated" : "created"} successfully`
      );
      setRefresh(refresh + 1);

      setIsUpdate(null);
      setTitle("");
      setSlug("");
      setSubCategories([]);
    } catch (e) {
      NotifyWarning(e?.response?.data?.message || "Something went wrong");
    }
  };

  // ******************* Delete Post Categories *************************
  const deleteCategory = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/blog/category/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      NotifySuccess("Category Deleted successfully");
      setRefresh(refresh + 1);
    } catch (e) {
      NotifyWarning(e?.response?.data?.message || "Something went wrong");
    }
  };

  // ******************* Update Blog Categories *************************
  const onUpdateCategory = async (data) => {
    setTitle(data.title);
    setSlug(data.slug);
    setIsUpdate(data._id);
    setSubCategories(data.subCategories);
  };

  // ******************* Pagination *************************
  const nextPage = () => {
    if (currentPage < categories.pagination.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="py-2 px-4 flex text-neutral-600">Post Categories</div>
      <div className="grid grid-cols-3 gap-2">
        {/* Fetch All Poat Categories  */}
        <div className="col-span-2">
          <PostCategoryTable
            blogs={categories}
            onDelete={deleteCategory}
            setUpdate={onUpdateCategory}
            nextPage={nextPage}
            previousPage={previousPage}
          />
        </div>
        {/*  Create Categories  */}
        <div className="p-4 m-2 rounded border border-gray-200 bg-white">
          <form onSubmit={createBlogPost} className="my-2">
            <div className="my-2">
              <label>Title</label>
              <input
                type="text"
                name="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                  setSlug(generateSlug(e.target.value));
                }}
                value={title}
                className="w-full border border-neutral-200 outline-none px-4 py-2 rounded"
                required
              />
            </div>
            <div className="my-2">
              <label>Slug</label>
              <input
                type="text"
                name="slug"
                value={slug}
                onChange={(e) => setSlug(generateSlug(e.target.value))}
                className="w-full border border-neutral-200 outline-none px-4 py-2 rounded text-blue-500 underline"
                required
              />
            </div>

            <div className="my-2">
              <label>Sub Categories</label>
              <KeywordInput keywords={subCategories} setKeywords={setSubCategories} />
            </div>

            <div className="flex my-4">
              <button
                type="submit"
                value="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded w-full"
              >
                {isUpdate ? "Update Category" : "Create Category"}
              </button>
            </div>
            {isUpdate && (
              <p
                onClick={() => {
                  setIsUpdate(null);
                  setTitle("");
                  setSlug("");
                }}
                className="text-sm text-center cursor-pointer"
              >
                Create New
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
