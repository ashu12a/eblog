import React from "react";
import Breadcrum from "../components/breadcrum";
import { useParams } from "react-router-dom";
import { Card7 } from "../components/card";

import cardimg15 from "../assets/img/15.jpg";
import cardimg16 from "../assets/img/16.jpg";
import cardimg17 from "../assets/img/17.jpg";

import Footer from "../components/menu/Footer";
import Sidebar from "../components/menu/Sidebar";

export default function Post() {
  window.scroll(0, 0);
  const { slug } = useParams();

  return (
    <div>
      <Breadcrum
        text={[
          { title: "Home", url: "/" },
          { title: "Category", url: "" },
          { title: slug, url: "" },
        ]}
      />

      <div className="flex gap-4 lg:px-20 md:px-10 px-4 my-6">
        <div className="lg:w-[75%] w-[100%]">
          <Card7
            category="Technology"
            img={cardimg15}
            author="Elon Mask"
            read="3"
            views="1.9k"
            title="Cloud journeys: Jeff Barr on inspiring cloud industry leaders"
            description="At the same time, many technologists appreciate the ability to define their own learning adventure, especially those with more advanced or niche skill sets..."
          />
          <Card7
            category="Technology"
            img={cardimg16}
            author="Elon Mask"
            read="3"
            views="1.9k"
            title="Cloud journeys: Jeff Barr on inspiring cloud industry leaders"
            description="At the same time, many technologists appreciate the ability to define their own learning adventure, especially those with more advanced or niche skill sets..."
          />
          <Card7
            category="Technology"
            img={cardimg17}
            author="Elon Mask"
            read="3"
            views="1.9k"
            title="Cloud journeys: Jeff Barr on inspiring cloud industry leaders"
            description="At the same time, many technologists appreciate the ability to define their own learning adventure, especially those with more advanced or niche skill sets..."
          />
          <Card7
            category="Technology"
            img={cardimg15}
            author="Elon Mask"
            read="3"
            views="1.9k"
            title="Cloud journeys: Jeff Barr on inspiring cloud industry leaders"
            description="At the same time, many technologists appreciate the ability to define their own learning adventure, especially those with more advanced or niche skill sets..."
          />
          <Card7
            category="Technology"
            img={cardimg16}
            author="Elon Mask"
            read="3"
            views="1.9k"
            title="Cloud journeys: Jeff Barr on inspiring cloud industry leaders"
            description="At the same time, many technologists appreciate the ability to define their own learning adventure, especially those with more advanced or niche skill sets..."
          />
          <Card7
            category="Technology"
            img={cardimg17}
            author="Elon Mask"
            read="3"
            views="1.9k"
            title="Cloud journeys: Jeff Barr on inspiring cloud industry leaders"
            description="At the same time, many technologists appreciate the ability to define their own learning adventure, especially those with more advanced or niche skill sets..."
          />
          <Card7
            category="Technology"
            img={cardimg15}
            author="Elon Mask"
            read="3"
            views="1.9k"
            title="Cloud journeys: Jeff Barr on inspiring cloud industry leaders"
            description="At the same time, many technologists appreciate the ability to define their own learning adventure, especially those with more advanced or niche skill sets..."
          />
          <Card7
            category="Technology"
            img={cardimg16}
            author="Elon Mask"
            read="3"
            views="1.9k"
            title="Cloud journeys: Jeff Barr on inspiring cloud industry leaders"
            description="At the same time, many technologists appreciate the ability to define their own learning adventure, especially those with more advanced or niche skill sets..."
          />
          <div className="my-10 text-center">
            <button className="bg-primary text-white px-10 py-2 hover:bg-black transition duration-500">
              Load More
            </button>
          </div>
        </div>
        <div className="w-[25%] lg:block hidden">
          <Sidebar />
        </div>
      </div>
      <Footer />
    </div>
  );
}
