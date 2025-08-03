import React from "react";
import { Heading } from "./utils";
import { FaRegClock } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import { Link } from "react-router-dom";

export function Card1({ img, author, slug, title }) {
  return (
    <Link to={`/post-detail/${slug}`} className="block">
    <div className="flex flex-col gap-2">
      <div className="overflow-hidden">
        <img
          src={img}
          alt=""
          className="transition-transform duration-300 ease-in-out transform hover:scale-110 object-cover w-[100%] h-[240px]"
        />
      </div>
      <p className="text-sm">By {author}</p>
      <Heading className="text-xl" to={`/post-detail/${slug}`} text={title} />
    </div>
    </Link>
  );
}

export function Card2({ img, category, title, author, views, read, slug }) {
  return (
    
    <div
      className="h-full min-h-[400px] w-full text-white relative"
      style={{
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${img})`,
      }}
    >
      <div className="p-4">
        <p className="bg-gray-800 px-3 py-1 text-sm inline">{category}</p>
      </div>
      <div className="absolute bottom-0 black-transparent-background px-4 py-6">
        <Heading
          className="text-3xl text-white"
          to={`/post-detail/${slug}`}
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

export function Card3({ img, category, title, views, read, slug }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="overflow-hidden">
        <img
          src={img}
          alt=""
          className="transition-transform duration-300 ease-in-out transform hover:scale-110 object-cover h-[150px] w-[100%]"
        />
      </div>
      <div className="col-span-2 lg:my-2 md:my-2">
        <p className="bg-gray-200 px-3 py-1 text-sm lg:inline md:inline hidden">{category}</p>
        <div className="lg:mt-4 md:mt-4">
          <Heading className="text-lg" to={`/post-detail/${slug}`} text={title} />
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

export function Card4({ img, category, title, views, read, slug }) {
  return (
    <div className="my-2">
      <div className="overflow-hidden">
        <img
          src={img}
          alt=""
          className="transition-transform duration-300 ease-in-out transform hover:scale-110 object-cover h-[300px] w-[100%]"
        />
      </div>
      <div className="col-span-2 my-6">
        <p className="bg-gray-200 px-3 py-1 text-sm inline">{category}</p>
        <div className="mt-4">
          <Heading className="text-lg" to={`/post-detail/${slug}`} text={title} />
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

export function Card5({ img, category, title, author, views, read, slug }) {
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
          to={`/post-detail/${slug}`}
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
          className=" transition-transform duration-300 ease-in-out transform hover:scale-110 object-cover h-[100px] w-[100px]"
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

export function Card7({ img, category, title, views, read,slug }) {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
      <div className="overflow-hidden m-auto h-[300px]">
        <img
          src={img}
          alt=""
          className="transition-transform duration-300 ease-in-out transform hover:scale-110 h-[300px] object-cover"
        />
      </div>
      <div className="col-span-2 my-2 p-6">
        <p className="bg-gray-200 px-3 py-1 text-sm inline">{category}</p>
        <div className="mt-4">
          <Heading className="text-4xl" to={`/post-detail/${slug}`} text={title} />
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
            <Link  to={`/post-detail/${slug}`} className="text-primary underline">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
