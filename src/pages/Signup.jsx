import React from "react";
import Breadcrum from "../components/breadcrum";
import { Link } from "react-router-dom";
import FooterBar from "../components/menu/FooterBar";

export default function Signup() {
  return (
    <div>
      <Breadcrum
        text={[
          { title: "Home", url: "/" },
          { title: "Sign Up", url: "/sign-up" },
        ]}
      />

      <div className="flex justify-center items-center py-10">
        <div className="w-[400px]">
          <h1
            className="text-5xl text-center my-6"
            style={{ fontFamily: "URW Imperial W01 Regular" }}
          >
            Sign Up
          </h1>
          <input
            type="text"
            className="w-full border border-gray-400 rounded outline-none my-2 p-4 focus:border-primary transition duration-300 "
            placeholder="Full name"
          />
          <input
            type="text"
            className="w-full border border-gray-400 rounded outline-none my-2 p-4 focus:border-primary transition duration-300 "
            placeholder="Your email"
          />
          <input
            type="text"
            className="w-full border border-gray-400 rounded outline-none my-2 p-4 focus:border-primary transition duration-300 "
            placeholder="Password"
          />
          <input
            type="text"
            className="w-full border border-gray-400 rounded outline-none my-2 p-4 focus:border-primary transition duration-300 "
            placeholder="Re-enter password"
          />

          <div className="flex gap-2 py-2">
            <input type="checkbox" name="rememberme" className="w-4" />
            <p>
              I read and accept all{" "}
              <Link to="/" className="text-primary underline">
                terms of use.
              </Link>
            </p>
          </div>

          <button className="my-4 w-full py-3 bg-primary text-lg text-white rounded hover:bg-gray-900 transition duration-300">
            Sign Up
          </button>

          <div className="py-4">
            <p className="text-center underline">
              You already have an account?
              <Link to="/sign-in" className="text-primary mx-2">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* footer bar  */}
      <FooterBar />
    </div>
  );
}
