import React from "react";
import { Heading } from "./utils";
import { FaRegClock } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";

export function Slide1({img, category, heading, author, read, views }) {
  return (
    <div
      className="w-full h-[600px] relative bg-no-repeat bg-center bg-cover"
      style={{ background: `url(${img})` }}
    >
      <div className=" absolute bottom-16 lg:px-20 md:px-10 px-6 py-10">
        <p className="bg-gray-800 px-3 py-1 text-sm inline">{category}</p>
        <div className="mt-4 lg:text-5xl md:text-4xl text-2xl  max-w-[800px] text-white">
          <Heading
            to=""
            white={true}
            text={heading}
          />
        </div>
        <div className="text-md flex flex-wrap lg:gap-20 md:gap-10 gap-4 mt-8 font-semibold">
          <p>
            <span className="font-light">By</span> {author}
          </p>
          <p className="flex items-center gap-2">
            <FaRegClock/> {read} Minute Read
          </p>
          <p className="flex items-center gap-2">
            <FaChartSimple /> {views} Views
          </p>
        </div>
      </div>
    </div>
  );
}
