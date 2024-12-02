import React, { useEffect, useState } from "react";
import PostTable from "../../components/table/PostTable";
import { Link } from "react-router-dom";
import { IoAddCircleSharp } from "react-icons/io5";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { NotifySuccess, NotifyWarning } from "../../utils/Notify";

export default function Posts() {
  const { token } = useAuth(); // Assuming useAuth hook is defined and provides token
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [refresh, setRefresh] = useState(0);

  // ******** Fetch Blog Posts ***************
  const getBlogPost = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/blog?page=${currentPage}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (data?.success) {
      setBlogs(data);
    }
  };
  useEffect(() => {
    getBlogPost();
  }, [refresh, currentPage]);

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

  return (
    <div>
      <div className="py-2 px-4 flex">
        <Link
          to={"/posts/create"}
          className="px-4 mr-auto bg-blue-600 py-2 rounded text-white flex items-center gap-2 hover:scale-[1.02] duration-300"
        >
          <IoAddCircleSharp /> New Post
        </Link>
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
