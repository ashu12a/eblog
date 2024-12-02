import React from "react";
import "swiper/css";
import "swiper/css/pagination";


import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaPinterestSquare,
  FaYoutube,
} from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="bg-gray-900 py-1 grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-2 text-center text-white text-sm">
      {/* first element  */}
      <div className="uppercase font-bold flex items-center gap-4 m-auto">
        Follow Us:
        <FaFacebookSquare />
        <FaInstagramSquare />
        <FaSquareXTwitter />
        <FaYoutube />
        <FaPinterestSquare />
      </div>
      {/* second element  */}
      <div className="uppercase font-bold m-auto flex gap-1 items-center text-xs">
        <AiFillThunderbolt size={16} className="text-primary" />
        <Swiper
          direction={"vertical"}
          className="text-white"
          mousewheel={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: true, 
          }}
          modules={[Autoplay, Pagination, Navigation]}
          style={{ height: "20px" }}
        >
          <SwiperSlide> Apple opens its iPhone ecosystem in the EU</SwiperSlide>
          <SwiperSlide> Apple opens its iPhone ecosystem in the EU</SwiperSlide>
          <SwiperSlide> Apple opens its iPhone ecosystem in the EU</SwiperSlide>
        </Swiper>
      </div>
      {/* third element  */}
      <div className="uppercase font-bold flex gap-2 m-auto">
        <button className="text-md uppercase text-primary">Subscribe</button>|
        <Link to='/sign-in' className="text-md uppercase">Login</Link>
      </div>
    </div>
  );
}
