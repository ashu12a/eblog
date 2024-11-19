import React from "react";
import { Heading } from "./utils";
import { FaRegClock } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import { Link } from "react-router-dom";

export function Card1({ img, author, title }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="overflow-hidden">
        <img
          src={img}
          alt=""
          className="transition-transform duration-300 ease-in-out transform hover:scale-110 object-cover"
        />
      </div>
      <p className="text-sm">By {author}</p>
      <Heading className="text-xl" to="" text={title} />
    </div>
  );
}

export function Card2({ img, category, title, author, views, read }) {
  return (
    <div
      className="h-full min-h-[400px] w-full text-white relative"
      style={{
        background: `url(${img})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="p-4">
        <p className="bg-gray-800 px-3 py-1 text-sm inline">{category}</p>
      </div>
      <div className="absolute bottom-0 black-transparent-background px-4 py-6">
        <Heading
          className="text-3xl text-white"
          to=""
          white={true}
          text={title}
        />
        <div className="text-md flex gap-10 mt-8 font-semibold">
          <p>
            <span className="font-light">By</span> {author}
          </p>
          <p className="flex items-center gap-2">
            <FaRegClock /> {read} Minute Read
          </p>
          <p className="flex items-center gap-2">
            <FaChartSimple /> {views} Views
          </p>
        </div>
      </div>
    </div>
  );
}

export function Card3({ img, category, title, views, read }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="overflow-hidden">
        <img
          src={img}
          alt=""
          className="transition-transform duration-300 ease-in-out transform hover:scale-110 object-cover"
        />
      </div>
      <div className="col-span-2 lg:my-2 md:my-2">
        <p className="bg-gray-200 px-3 py-1 text-sm lg:inline md:inline hidden">{category}</p>
        <div className="lg:mt-4 md:mt-4">
          <Heading className="text-lg" to="" text={title} />
          <div className="lg:text-md md:text-md text-xs flex lg:gap-10 gap-4 mt-2 ">
            <p className="flex items-center gap-2">
              <FaRegClock /> {read} Minute Read
            </p>
            <p className="flex items-center gap-2">
              <FaChartSimple /> {views} Views
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Card4({ img, category, title, views, read }) {
  return (
    <div className="my-2">
      <div className="overflow-hidden">
        <img
          src={img}
          alt=""
          className="transition-transform duration-300 ease-in-out transform hover:scale-110 object-cover"
        />
      </div>
      <div className="col-span-2 my-6">
        <p className="bg-gray-200 px-3 py-1 text-sm inline">{category}</p>
        <div className="mt-4">
          <Heading className="text-lg" to="" text={title} />
          <div className="text-md flex gap-10 mt-2 ">
            <p className="flex items-center gap-2">
              <FaRegClock /> {read} Minute Read
            </p>
            <p className="flex items-center gap-2">
              <FaChartSimple /> {views} Views
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Card5({ img, category, title, author, views, read }) {
  return (
    <div
      className="h-full min-h-[450px] w-full text-white relative"
      style={{
        background: `url(${img})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="p-4">
        <p className="bg-gray-800 px-3 py-1 text-sm inline">{category}</p>
      </div>
      <div className="absolute bottom-0 black-transparent-background  px-4 py-6">
        <Heading
          className="text-xl text-white"
          to=""
          white={true}
          text={title}
        />
        <div className="text-md flex gap-6 mt-2 ">
          <p>By {author}</p>
          <p className="flex items-center gap-2">
            <FaChartSimple /> {views} Views
          </p>
        </div>
      </div>
    </div>
  );
}

export function Card6({ img, title, views, read }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="overflow-hidden w-[100px] h-[105x]">
        <img
          src={img}
          alt=""
          className=" transition-transform duration-300 ease-in-out transform hover:scale-110 object-cover"
        />
      </div>
      <div className="col-span-2">
        <div className="">
          <Heading className="text-" to="" text={title} />
          <div className="text-xs flex gap-2 mt-2 ">
            <p className="flex items-center gap-2">
              <FaRegClock /> {read} Minute Read
            </p>
            <p className="flex items-center gap-2">
              <FaChartSimple /> {views} Views
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Card7({ img, category, title, views, read }) {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
      <div className="overflow-hidden">
        <img
          src={img}
          alt=""
          className="transition-transform duration-300 ease-in-out transform hover:scale-110 object-cover"
        />
      </div>
      <div className="col-span-2 my-2 p-6">
        <p className="bg-gray-200 px-3 py-1 text-sm inline">{category}</p>
        <div className="mt-4">
          <Heading className="text-4xl" to="" text={title} />
          <div className="text-md flex gap-10 my-4">
            <p className="flex items-center gap-2">
              <FaRegClock /> {read} Minute Read
            </p>
            <p className="flex items-center gap-2">
              <FaChartSimple /> {views} Views
            </p>
          </div>
          <p>
            At the same time, many technologists appreciate the ability to
            define their own learning adventure, especially those with more
            advanced or niche skill sets...
          </p>
          <div className="my-6 ">
            <Link to="" className="text-primary underline">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
