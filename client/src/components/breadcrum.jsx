import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Breadcrum({ text }) {
  return (
    <div className="bg-gray-100 py-5 text-center flex justify-center items-center gap-2">
      {text.map((item, index) => (
        <p
          key={index}
          className="flex justify-center items-center gap-2 text-gray-600"
        >
          <Link to={item.url} className="hover:text-primary transition duration-300">{item.title}</Link>
          {index < text.length - 1 && (
            <MdKeyboardArrowRight className="mt-1" size={20} />
          )}
        </p>
      ))}
    </div>
  );
}
