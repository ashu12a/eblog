import React from "react";
import logo from "../../assets/img/logo-w.svg";

import {
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import FooterBar from "./FooterBar";

export default function Footer() {
  return (
    <section>
      <div className="bg-gray-900 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 py-10">
        <div>
          <h2 className="text-xl text-center text-white py-2 max-w-[300px] m-auto">
            Follow us on:
          </h2>
          <div className="my-4 py-4  flex justify-center items-center">
            <span className="mx-2 hover:bg-primary bg-white rounded-full p-4 transition duration-300">
              {" "}
              <FaFacebookF />{" "}
            </span>
            <span className="mx-2 hover:bg-primary bg-white rounded-full p-4 transition duration-300">
              {" "}
              <FaInstagram />{" "}
            </span>
            <span className="mx-2 hover:bg-primary bg-white rounded-full p-4 transition duration-300">
              {" "}
              <FaXTwitter />{" "}
            </span>
            <span className="mx-2 hover:bg-primary bg-white rounded-full p-4 transition duration-300">
              {" "}
              <FaYoutube />{" "}
            </span>
            <span className="mx-2 hover:bg-primary bg-white rounded-full p-4 transition duration-300">
              {" "}
              <FaPinterest />{" "}
            </span>
          </div>
        </div>
        <div className="text-white text-center lg:block md:hidden block">
          <img src={logo} alt="logo." className="m-auto my-6" />
          <p className="px-2">
            Nisi dignissim tortor sed quam sed ipsum ut tortor sed dignissim
            montes, morbi euismod elit.
          </p>
        </div>

        <div className="py-6">
          <div className="max-w-[350px] m-auto">
            <p className="text-white text-xl">Join my newsletter:</p>
            <div className="flex gap-2 justify-center items-center max-w-[400px] my-4">
              <input type="text" className="px-4 py-2 w-full outline-none" />
              <input
                type="button"
                value="Submit"
                className="text-white bg-primary px-6 py-2 text-lg"
              />
            </div>
          </div>
        </div>
      </div>
      {/* footer bar  */}
      <FooterBar />
    </section>
  );
}
