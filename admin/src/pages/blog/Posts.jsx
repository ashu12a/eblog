import React, { useEffect, useState } from "react";
import PostTable from "../../components/table/PostTable";
import { Link } from "react-router-dom";
import { IoAddCircleSharp } from "react-icons/io5";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { NotifySuccess, NotifyWarning } from "../../utils/Notify";
import { useGlobalLoading } from "../../context/LoadingContext";

export default function Posts() {
  const { token } = useAuth(); // Assuming useAuth hook is defined and provides token
  const { startLoading, stopLoading } = useGlobalLoading();

  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [label, setLabel] = useState("");

  // ******** Fetch Blog Posts ***************
  const getBlogPost = async () => {
    startLoading();
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/blog?page=${currentPage}&label=${label}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (data?.success) {
      setBlogs(data);
    }
    stopLoading();
  };
  useEffect(() => {
    getBlogPost();
  }, [refresh, currentPage, label]);

  // ************** Delete Blog Posts ***************
  const deleteBlogPost = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      NotifySuccess("Post Deleted successfully");
      setRefresh(refresh + 1);
    } catch (e) {
      NotifyWarning(e?.response?.data?.message || "Something went wrong");
    }
  };

  // Pagination ***************************
  const nextPage = () => {
    if (currentPage < blogs.pagination.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterByLabel = (e) => {
    const label = e.target.value;
    setCurrentPage(1);
    setLabel(label);
  };

  return (
    <div>
      <div className="py-2 px-4 flex justify-between items-center">
        <div>
          <Link
            to={"/posts/create"}
            className="px-4 mr-auto bg-blue-600 py-2 rounded text-white flex items-center gap-2 hover:scale-[1.02] duration-300"
          >
            <IoAddCircleSharp /> New Post
          </Link>
        </div>

        {/* showing msg  */}
        {label && (
          <div className="text-sm text-gray-500">
            Showing posts with label: <span className="font-bold capitalize text-blue-600">{label}</span>
          </div>
        )}

        {/* Filter by Labels  */}
        <div className="flex items-center gap-2 ">
          <select
            className="w-full border border-neutral-200 outline-none px-4 py-2 rounded"
            onChange={handleFilterByLabel}
          >
            <option value="">All</option>
            <option value="featured">Featured</option>
            <option value="trending">Trending</option>
            <option value="latest">Latest</option>
            <option value="popular">Popular</option>
          </select>
        </div>
      </div>
      <div>
        <PostTable
          blogs={blogs}
          onDelete={deleteBlogPost}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </div>
    </div>
  );
}
