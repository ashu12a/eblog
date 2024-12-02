import React, { useState } from "react";
import { BiSolidPencil } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import ConfirmBox from "../other/ConfirmBox";
import { Link } from "react-router-dom";

export default function PostTable({ blogs, onDelete, nextPage, previousPage }) {
  const [deleteId, setDeleteId] = useState(null);

  // *************** Status Color : ****************************
  const getStatusColor = (status) => {
    switch (status) {
      case "publish":
        return "bg-green-100 text-green-700";
      case "draft":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="container mx-auto p-2">
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-neutral-200 text-left text-sm font-semibold text-gray-600 uppercase">
              <th className="px-6 py-3">Id</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs?.data?.map((post, index) => (
              <tr className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}>
                <td className="px-6 py-2 text-gray-800"> {(blogs.pagination.page - 1) * blogs.pagination.limit + index + 1} </td>
                <td className="px-6 py-2 text-gray-800">
                  {" "}
                  {post.title.slice(0, 75)}
                  {post.title.length > 75 && "..."}
                </td>
                <td className="px-6 py-2 text-gray-600">
                  {post?.category?.title}
                </td>
                <td className="px-6 py-2 text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      post.status
                    )}`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-2 text-center">
                  <Link to={`/posts/update/${post._id}`}>
                    <button className="px-2 py-2 text-yellow-500 rounded hover:bg-neutral-200">
                      <BiSolidPencil />
                    </button>
                  </Link>
                  <button
                    className="px-2 py-2 text-red-600 rounded hover:bg-neutral-200"
                    onClick={() => setDeleteId(post._id)}
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
          Page {blogs?.pagination?.page} of {blogs?.pagination?.totalPages}
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
          onDelete={onDelete}
        />
      )}
    </div>
  );
}
