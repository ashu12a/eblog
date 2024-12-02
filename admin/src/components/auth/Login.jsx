import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NotifySuccess, NotifyWarning } from "../../utils/Notify";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ******** Login Function ***************
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/login`,
      {
        email: e.target.email.value,
        password: e.target.password.value,
      }
    );
    if (data?.success) {
      login(data.token);
      setTimeout(() => {
        navigate("/");
      }, 1000);
      NotifySuccess("Login successful");
    }else{
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center lg:py-28 py-10">
        <div className="w-[500px] border border-gray-300 shadow p-10 rounded">
          <h1
            className="text-5xl text-center my-6"
            style={{ fontFamily: "URW Imperial W01 Regular" }}
          >
            Sign In
          </h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              className="w-full border border-gray-400 rounded outline-none my-2 p-4 focus:border-primary transition duration-300 "
              name="email"
              placeholder="Your email"
              value="example@mail.com"
            />
            <input
              type="password"
              className="w-full border border-gray-400 rounded outline-none my-2 p-4 focus:border-primary transition duration-300 "
              name="password"
              placeholder="Password"
              value="passcode"
            />
            <div className="my-2 flex justify-between">
              <div className="flex gap-2">
                <input type="checkbox" name="rememberme" className="w-4" />
                <p>Remember me</p>
              </div>
              <Link
                to=""
                onClick={() => {
                  NotifyWarning("Contact Customer Support");
                }}
                className="underline text-primary"
              >
                Forgot Password
              </Link>
            </div>

            <div className="flex text-center">
              <button
                type="submit"
                disabled={loading}
                className="my-4 w-full py-3 bg-primary text-lg text-white rounded bg-gray-800 hover:scale-[1.01] hover:bg-gray-900 transition duration-300"
              >
                {loading ? "Loading..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
