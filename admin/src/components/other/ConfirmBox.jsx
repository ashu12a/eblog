import React from "react";
import { BiSolidError } from "react-icons/bi";

export default function ConfirmBox({ setDeleteId , deleteId, onDelete }) {
  return (
    <div>
      <div className="bg-black opacity-25 w-full h-full absolute z-10 inset-0" onClick={() => setDeleteId(null)}></div>
      <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed top-[40%] inset-x-0 z-50 mb-4 mx-4">
        <div className="md:flex items-center">
          <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
            {<BiSolidError size={30} className="text-red-600" />}
          </div>
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <p className="font-bold">Delete your content</p>
            <p className="text-sm text-gray-700 mt-1">
              You will lose your data by deleting your post. This action cannot
              be undone.
            </p>
          </div>
        </div>
        <div className="text-center md:text-right mt-4 md:flex md:justify-end">
          <button onClick={() => {
            onDelete(deleteId);
            setDeleteId(null);
            }} className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">
            Delete Content
          </button>
          <button
            onClick={() => setDeleteId(null)}
            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
