import "swiper/css";
import "swiper/css/pagination";
import heroBanner1 from "../assets/img/banner-bg-01.jpg";
import heroBanner2 from "../assets/img/banner-bg-02.jpg";
import heroBanner3 from "../assets/img/banner-bg-03.jpg";
import cardimg1 from "../assets/img/01.jpg";
import cardimg2 from "../assets/img/02.jpg";
import cardimg3 from "../assets/img/03.jpg";
import cardimg4 from "../assets/img/04.jpg";
import cardimg5 from "../assets/img/05.jpg";
import cardimg6 from "../assets/img/06.jpg";
import cardimg7 from "../assets/img/07.jpg";
import cardimg8 from "../assets/img/08.jpg";
import cardimg9 from "../assets/img/09.jpg";
import cardimg10 from "../assets/img/10.jpg";
import cardimg11 from "../assets/img/11.jpg";
import cardimg14 from "../assets/img/14.jpg";
import cardimg15 from "../assets/img/15.jpg";
import cardimg16 from "../assets/img/16.jpg";
import cardimg13 from "../assets/img/13.jpg";
import cardimg17 from "../assets/img/17.jpg";
import cardimg18 from "../assets/img/18.jpg";
import cardimg19 from "../assets/img/19.jpg";
import cardimg20 from "../assets/img/20.jpg";
import cardimg21 from "../assets/img/21.jpg";
import cardimg22 from "../assets/img/22.jpg";
import catimg1 from "../assets/img/category-01.jpg";
import catimg2 from "../assets/img/category-02.jpg";
import catimg3 from "../assets/img/category-03.jpg";
import adimg from "../assets/img/ad.jpg";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Slide1 } from "../components/slides";
import {
  Card1,
  Card2,
  Card3,
  Card4,
  Card5,
  Card6,
  Card7,
} from "../components/card";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Footer from "../components/menu/Footer";

export default function Home() {
  window.scroll(0,0);
  
  return (
    <div className="min-h-screen">
      {/* ---------------------------carousel-------------------------  */}
      <div className="overflow-hidden max-w-screen">
        <Swiper
          className="text-white hero-slider"
          mousewheel={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          style={{ width: "99vw" }}
        >
          <SwiperSlide>
            <Slide1
              img={heroBanner1}
              category="Freedom"
              heading="Apple needs a $250 iPhone to boost sales but it doesn't want
                    to make"
              author="Elon Mask - 14 Jan, 2024"
              read="3"
              views="1.9k"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide1
              img={heroBanner2}
              category="Freedom"
              heading="Apple needs a $250 iPhone to boost sales but it doesn't want
                    to make"
              author="Elon Mask - 14 Jan, 2024"
              read="3"
              views="1.9k"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide1
              img={heroBanner3}
              category="Freedom"
              heading="Apple needs a $250 iPhone to boost sales but it doesn't want
                    to make"
              author="Elon Mask - 14 Jan, 2024"
              read="3"
              views="1.9k"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* -----------------------Trending Content-----------------------  */}
      <div className="bg-white">
        <div className="my-14">
          <h2 className="text-4xl text-center font-semibold">Trending Now</h2>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-8 gap-6 lg:px-20 md:px-16 px-10 text-center">
          <Card1
            img={cardimg1}
            author="Elon Mask - 14 Jan, 2024"
            title="Building an Editor by Sharing Code Between Android"
          />
          <Card1
            img={cardimg2}
            author="Elon Mask - 14 Jan, 2024"
            title="Building an Editor by Sharing Code Between Android"
          />
          <Card1
            img={cardimg3}
            author="Elon Mask - 14 Jan, 2024"
            title="Building an Editor by Sharing Code Between Android"
          />
          <Card1
            img={cardimg4}
            author="Elon Mask - 14 Jan, 2024"
            title="Building an Editor by Sharing Code Between Android"
          />
        </div>
      </div>

      {/* -------------------------Category & Featured Post--------------------  */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-8 mt-20 lg:px-16 px-4">
        <div className="col-span-3">
          <h2 className="text-4xl font-semibold flex items-center break-keep gap-4">
            <span className="whitespace-nowrap">Technology</span>
            <span className="w-full h-[1px] bg-gray-200 mt-2 rounded"></span>
          </h2>
          <div className="grid lg:grid-cols-2 grid-cols-1  gap-8 my-16">
            <Card2
              category="Technology"
              img={cardimg5}
              author="Elon Mask"
              read="3"
              views="1.9k"
              title="Cloud journeys: Jeff Barr on inspiring cloud industry leaders"
            />
            <div className="flex flex-col gap-3">
              <Card3
                category="Technology"
                img={cardimg6}
                read="3"
                views="1.9k"
                title="Two simple techniques to make your release process"
              />
              <Card3
                category="Technology"
                img={cardimg7}
                read="3"
                views="1.9k"
                title="How Can A Wellness Retreat Help Reconnect You to Your"
              />
              <Card3
                category="Technology"
                img={cardimg8}
                read="3"
                views="1.9k"
                title="How Can A Wellness Retreat Help Reconnect You to Your"
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:block hidden">
          <h2 className="text-xl text-center bg-gray-100 py-2 max-w-[300px] m-auto">
            Feature Post
          </h2>
          <div className="my-16">
            <Card4
              category="Technology"
              img={cardimg18}
              read="3"
              views="1.9k"
              title="How Can A Wellness Retreat Help Reconnect You to Your"
            />
          </div>
        </div>
      </div>

      {/* -------------------------Category & Featured Post 2--------------------  */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 lg:px-16 px-4 mt-10">
        <div className="col-span-3">
          <h2 className="text-4xl font-semibold flex items-center break-keep gap-4">
            <span className="whitespace-nowrap">Artificial Intelligence</span>
            <span className="w-full h-[1px] bg-gray-200 mt-2 rounded"></span>
          </h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 my-16">
            <Card5
              category="Technology"
              img={cardimg9}
              author="Elon Mask"
              read="3"
              views="1.9k"
              title="Cloud journeys: Jeff Barr on inspiring cloud industry leaders"
            />
            <Card5
              category="Technology"
              img={cardimg10}
              author="Elon Mask"
              read="3"
              views="1.9k"
              title="Cloud journeys: Jeff Barr on inspiring cloud industry leaders"
            />
            <Card5
              category="Technology"
              img={cardimg11}
              author="Elon Mask"
              read="3"
              views="1.9k"
              title="Cloud journeys: Jeff Barr on inspiring cloud industry leaders"
            />
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 mb-8 gap-4">
            <Card3
              category="Technology"
              img={cardimg14}
              read="3"
              views="1.9k"
              title="Two simple techniques to make your release process"
            />
            <Card3
              category="Technology"
              img={cardimg15}
              read="3"
              views="1.9k"
              title="How Can A Wellness Retreat Help Reconnect You to Your"
            />
            <Card3
              category="Technology"
              img={cardimg13}
              read="3"
              views="1.9k"
              title="Two simple techniques to make your release process"
            />
            <Card3
              category="Technology"
              img={cardimg17}
              read="3"
              views="1.9k"
              title="How Can A Wellness Retreat Help Reconnect You to Your"
            />
          </div>
        </div>
        <div className="col-span-1 lg:block hidden">
          <h2 className="text-xl text-center bg-gray-100 py-2 max-w-[300px] m-auto">
            Popular Post
          </h2>
          <div className="my-16 flex flex-col gap-3">
            <Card6
              img={cardimg19}
              read="3"
              views="1.9k"
              title="How Can A Wellness Retreat Help Reconnect You to Your"
            />
            <Card6
              img={cardimg20}
              read="3"
              views="1.9k"
              title="How Can A Wellness Retreat Help Reconnect You to Your"
            />
            <Card6
              img={cardimg21}
              read="3"
              views="1.9k"
              title="How Can A Wellness Retreat Help Reconnect You to Your"
            />
            <Card6
              img={cardimg22}
              read="3"
              views="1.9k"
              title="How Can A Wellness Retreat Help Reconnect You to Your"
            />
          </div>

          <h2 className="text-xl text-center bg-gray-100 py-2 max-w-[300px] m-auto">
            Browse Category
          </h2>
          <div className="flex flex-col gap-4 my-6">
            <div className="flex relative">
              <img src={catimg1} alt="" className="h-16 w-full" />
              <h4 className="absolute w-full h-full flex justify-center items-center  text-white font-semibold black-transparent-background">
                Artificial Intelligence
              </h4>
            </div>
            <div className="flex relative">
              <img src={catimg2} alt="" className="h-16 w-full" />
              <h4 className="absolute w-full h-full flex justify-center items-center  text-white font-semibold black-transparent-background">
                BitCoint
              </h4>
            </div>
            <div className="flex relative">
              <img src={catimg3} alt="" className="h-16 w-full" />
              <h4 className="absolute w-full h-full flex justify-center items-center  text-white font-semibold black-transparent-background">
                Gadgets
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------Latest News & Browse Categroy -------------------  */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 lg:px-16 px-4 mt-10">
        <div className="col-span-3">
          <h2 className="text-4xl font-semibold flex items-center break-keep gap-4">
            <span className="whitespace-nowrap">Latest News</span>
            <span className="w-full h-[1px] bg-gray-200 mt-2 rounded"></span>
          </h2>
          <div className="flex flex-col gap-4 my-16">
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
            <div className="my-10 m-auto">
              <button className="bg-primary text-white px-10 py-2 hover:bg-black transition duration-500">
                Load More
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:block hidden">
          <h2 className="text-xl text-center bg-gray-100 py-2 max-w-[300px] m-auto">
            Popular Post
          </h2>
          <div className="my-16 flex flex-col gap-3">
            <Card6
              img={cardimg19}
              read="3"
              views="1.9k"
              title="How Can A Wellness Retreat Help Reconnect You to Your"
            />
            <Card6
              img={cardimg20}
              read="3"
              views="1.9k"
              title="How Can A Wellness Retreat Help Reconnect You to Your"
            />
            <Card6
              img={cardimg21}
              read="3"
              views="1.9k"
              title="How Can A Wellness Retreat Help Reconnect You to Your"
            />
            <Card6
              img={cardimg22}
              read="3"
              views="1.9k"
              title="How Can A Wellness Retreat Help Reconnect You to Your"
            />
          </div>

          <div>
            <h2 className="text-xl text-center bg-gray-100 py-2 max-w-[300px] m-auto">
              Follow Me
            </h2>
            <div className="my-4 py-4  flex justify-center items-center">
              <span className="mx-2 hover:bg-primary hover:text-white rounded-full p-2 text-primary transition duration-300">
                {" "}
                <FaFacebookF />{" "}
              </span>
              <span className="mx-2 hover:bg-primary hover:text-white rounded-full p-2 text-primary transition duration-300">
                {" "}
                <FaInstagram />{" "}
              </span>
              <span className="mx-2 hover:bg-primary hover:text-white rounded-full p-2 text-primary transition duration-300">
                {" "}
                <FaXTwitter />{" "}
              </span>
              <span className="mx-2 hover:bg-primary hover:text-white rounded-full p-2 text-primary transition duration-300">
                {" "}
                <FaYoutube />{" "}
              </span>
              <span className="mx-2 hover:bg-primary hover:text-white rounded-full p-2 text-primary transition duration-300">
                {" "}
                <FaPinterest />{" "}
              </span>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl text-center bg-gray-100 py-2 max-w-[300px] m-auto ">
              Subscribe News Letter
            </h2>
            <div className="text-center">
              <input
                type="text"
                className="w-full border border-black outline-none p-3 max-w-[300px] my-6"
                placeholder="Your email address"
              />
              <input
                type="button"
                value="Submit"
                className="py-3 bg-black text-white w-full max-w-[300px]"
              />
            </div>
            <div className="my-6">
              <img src={adimg} alt="" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
