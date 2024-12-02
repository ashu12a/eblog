import React from "react";
import Breadcrum from "../components/breadcrum";
import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import FooterBar from "../components/menu/FooterBar";
import { NotifyWarning } from "../utils/Notify";

export default function Signin() {
  return (
    <div>
      <Breadcrum
        text={[
          { title: "Home", url: "/" },
          { title: "Sign In", url: "/sign-in" },
        ]}
      />

      <div className="flex justify-center items-center py-10">
        <div className="w-[400px]">
          <h1
            className="text-5xl text-center my-6"
            style={{ fontFamily: "URW Imperial W01 Regular" }}
          >
            Sign In
          </h1>
          <input
            type="text"
            className="w-full border border-gray-400 rounded outline-none my-2 p-4 focus:border-primary transition duration-300 "
            placeholder="Your email"
            value='example@mail.com'
          />
          <input
            type="password"
            className="w-full border border-gray-400 rounded outline-none my-2 p-4 focus:border-primary transition duration-300 "
            placeholder="Password"
            value='**********'
          />
          <div className="my-2 flex justify-between">
            <div className="flex gap-2">
              <input type="checkbox" name="rememberme" className="w-4" />
              <p>Remember me</p>
            </div>
            <button onClick={() => {NotifyWarning('Not available in demo')}} className="underline text-primary">
              Forgot Password
            </button>
          </div>

        <div className="flex text-center">
          <Link to='/profile'  className="my-4 w-full py-3 bg-primary text-lg text-white rounded hover:bg-gray-900 transition duration-300">
            Login
          </Link>
        </div>

          <div className="text-gray-500 text-center text-xl my-2">OR</div>

          <button onClick={() => {NotifyWarning('Not available in demo')}} className="flex justify-center items-center gap-4 rounded my-4 w-full py-3 text-lg border border-gray-600 text-gray-600 hover:text-white hover:bg-gray-900 transition duration-300">
            <MdOutlineMail /> Login With Email
          </button>

          <button onClick={() => {NotifyWarning('Not available in demo')}} className="flex justify-center items-center gap-4 rounded my-4 w-full py-3 text-lg border border-gray-600 text-gray-600 hover:text-white hover:bg-gray-900 transition duration-300">
            <FaFacebook /> Login With Facebook
          </button>

          <div className="py-4">
            <p className="text-center underline">
              Have no account yet?{" "}
              <Link to="/sign-up" className="text-primary">
                Sign up
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
