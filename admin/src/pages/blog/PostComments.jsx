import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { NotifySuccess, NotifyWarning } from "../../utils/Notify";
import { useGlobalLoading } from "../../context/LoadingContext";
import { BiSolidPencil } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import ConfirmBox from "../../components/other/ConfirmBox";

export default function PostComments() {
  const { token } = useAuth(); // Assuming useAuth hook is defined and provides token
  const { startLoading, stopLoading } = useGlobalLoading();
  const [deleteId, setDeleteId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(0);

  // ******** Fetch Blog Posts ***************
  const getBlogComments = async () => {
    if (refresh === 0) {
      startLoading();
    }
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/blog/comment?page=${currentPage}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (data?.success) {
      setComments(data);
    }
    if (refresh === 0) {
      stopLoading();
    }
  };
  useEffect(() => {
    getBlogComments();
  }, [refresh, currentPage]);

  // ************** Delete Blog Posts ***************
  const deleteBlogComment = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/blog/comment/${deleteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      NotifySuccess("Comment Deleted successfully");
      setRefresh(refresh + 1);
    } catch (e) {
      NotifyWarning(e?.response?.data?.message || "Something went wrong");
    }
  };

  // ************** Delete Blog Posts ***************
  const updateBlogCommentStatusHandler = async (id, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/blog/comment/${id}`,
        {
          status: status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      NotifySuccess("Comment status updated");
      setRefresh(refresh + 1);
    } catch (e) {
      NotifyWarning(e?.response?.data?.message || "Something went wrong");
    }
  };

  // Pagination ***************************
  const nextPage = () => {
    if (currentPage < comments.pagination.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // *************** Status Color : ****************************
  const getStatusColor = (status) => {
    switch (status) {
      case "publish":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-400";
      default:
        return "bg-red-500";
    }
  };

  return (
    <div>
      <div className="container mx-auto p-2">
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-neutral-200 text-left text-sm font-semibold text-gray-600 uppercase">
                <th className="px-6 py-3">Sr</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {comments?.data?.map((comment, index) => (
                <tr
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                >
                  <td className="px-6 py-2 text-gray-800">
                    {(comments.pagination.page - 1) *
                      comments.pagination.limit +
                      index +
                      1}
                  </td>
                  <td className="px-6 py-2 text-gray-800 capitalize">
                    {comment?.fullname?.slice(0, 75)}
                    {comment?.fullname?.length > 75 && "..."}
                  </td>
                  <td className="px-6 py-2 text-gray-600 lowercase">
                    {comment?.email}
                  </td>
                  <td className="px-6 py-2 text-gray-600">{comment?.phone}</td>
                  <td className="px-6 py-2 text-gray-500">
                    {new Date(comment?.createdAt).toLocaleString()}
                  </td>
                  <td className="px-2 py-2 flex justify-center items-center gap-1">
                    <select
                      name="status"
                      id="status"
                      className={`${getStatusColor(
                        comment?.status
                      )} px-2 py-1 rounded focus:outline-none`}
                      value={comment?.status}
                      onChange={(e) =>
                        updateBlogCommentStatusHandler(
                          comment?._id,
                          e.target.selectedOptions[0].value
                        )
                      }
                    >
                      <option value="publish" className="bg-white">
                        Publish
                      </option>
                      <option value="pending" className="bg-white">
                        Pending
                      </option>
                      <option value="rejected" className="bg-white">
                        Rejected
                      </option>
                    </select>
                  </td>

                  <td className="px-6 py-2 text-center">
                    <button
                      className="px-2 py-2 text-red-600 rounded hover:bg-neutral-200"
                      onClick={() => setDeleteId(comment?._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={previousPage}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Previous
          </button>
          <span className="text-gray-600 text-sm">
            Page {comments?.pagination?.page} of{" "}
            {comments?.pagination?.totalPages}
          </span>
          <button
            onClick={nextPage}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Next
          </button>
        </div>

        {/* Delete Confirmation box  */}
        {deleteId && (
          <ConfirmBox
            setDeleteId={setDeleteId}
            deleteId={deleteId}
            onDelete={deleteBlogComment}
          />
        )}
      </div>
    </div>
  );
}
