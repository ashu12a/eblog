import React, { useEffect } from "react";
import Breadcrum from "../components/breadcrum";
import { useParams } from "react-router-dom";
import Sidebar from "../components/menu/Sidebar";
import Footer from "../components/menu/Footer";
import avatar from "../assets/img/avatar.png";

import { FaRegClock } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import {
  AddComment,
  GetPostCommentsBySlug,
  GetPostDetailBySlug,
} from "../api/posts";
import { useGlobalLoading } from "../context/LoadingContext";
import { baseuri } from "../utils/constant";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

export default function PostDetail() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const { slug } = useParams();

  const [isLoading, setIsLoading] = React.useState(false);
  const { startLoading, stopLoading } = useGlobalLoading();

  // Fetch post comments using react-query
  const { data: postDetailData, isLoading: isLoadingPostDetail } = useQuery({
    queryKey: ["postDetail", slug],
    queryFn: () => GetPostDetailBySlug(slug),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: postCommentsData, isLoading: isLoadingComments } = useQuery({
    queryKey: ["postComments", slug],
    queryFn: () => GetPostCommentsBySlug(slug),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!slug, // only run if slug is available
  });

  const postComments = postCommentsData?.data || [];
  const postDetail = postDetailData?.data || {};


  const loading = isLoadingPostDetail || isLoadingComments;

  useEffect(() => {
    if (loading) {
      startLoading();
    } else {
      stopLoading();
    }
  }, [loading]);

  const CreatedAT = new Date(postDetail.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const fullname = formData.get("fullname");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const comment = formData.get("comment");
    const data = {
      post: postDetail?._id,
      comment,
      fullname,
      email,
      phone,
    };

    const response = await AddComment(data);
    setIsLoading(false);
    if (response?.success) {
      toast.success("Comment sent for approval.");
      e.target.reset();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Breadcrum
        text={[
          { title: "Home", url: "/" },
          {
            title: postDetail?.subcategory,
            url: `/category/${postDetail?.subcategory}`,
          },
          { title: slug, url: "" },
        ]}
      />

      <div className="flex gap-4 lg:px-20 md:px-10 px-4 my-6">
        <div className="lg:w-[75%] md:w-[75%] w-[100%] font-imperial">
          <img
            src={`${baseuri}/public/${postDetail?.thumbnail}`}
            alt={postDetail?.thumbnail}
            className="w-full h-[400px]"
          />
          <div className="text-lg flex flex-wrap lg:gap-10 gap-2 mt-8 font-semibold">
            <p>
              <span className="font-light">By</span> {postDetail?.author?.name}{" "}
              - {CreatedAT}
            </p>
            <p className="flex items-center gap-2">
              <FaRegClock /> 120 Minute Read
            </p>
            <p className="flex items-center gap-2">
              <FaChartSimple /> 2.1k Views
            </p>
          </div>

          {/* show content  */}
          <div
            className="p-2"
            dangerouslySetInnerHTML={{ __html: postDetail?.content }}
          />

          {/* Comments  */}
          <div>
            <h3
              className="text-3xl mt-6 mb-4 font-semibold"
              style={{ fontFamily: "URW Imperial W01 Regular" }}
            >
              Recent Comments
            </h3>
            <div>

              {postComments?.map((item) => (
                <div
                  key={item._id}
                  className="border-b border-gray-200 flex justify-start items-center p-4 gap-6"
                >
                  <div>
                    <img src={avatar} className="w-20" alt="avatar" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{item.fullname}</h4>
                    <p className="text-gray-600 max-w-4xl">{item.comment}</p>
                    <p className="text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comment Form  */}
          <form className="my-10" onSubmit={handleCommentSubmit}>
            <h3
              className="text-3xl mt-6 mb-4 font-semibold"
              style={{ fontFamily: "URW Imperial W01 Regular" }}
            >
              Leave A Comment
            </h3>
            <p>
              Your email address will not be published. Repuired fields are
              marked*
            </p>
            <div className="pt-10 pb-6">
              <label htmlFor="comment"> Comment*</label>
              <textarea
                type="text"
                rows={4}
                name="comment"
                className="w-full border border-gray-400 rounded outline-none my-2 p-4 focus:border-primary transition duration-300 "
                placeholder="type here..."
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullname"
                  className="w-full border border-gray-400 rounded outline-none my-2 p-4 focus:border-primary transition duration-300 "
                  placeholder="Full Name"
                  required
                />
                <input
                  type="text"
                  name="email"
                  className="w-full border border-gray-400 rounded outline-none my-2 p-4 focus:border-primary transition duration-300 "
                  placeholder="Your Email"
                  required
                />
              </div>

              <input
                type="tel"
                name="phone"
                inputMode="numeric"
                pattern="[0-9]{10}"
                className="w-full border border-gray-400 rounded outline-none my-2 p-4 focus:border-primary transition duration-300"
                placeholder="Your Phone Number"
                minLength={10}
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity("Invalid phone number")
                }
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-lg text-white rounded hover:bg-gray-900 transition duration-300"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
        <div className="w-[25%] lg:block hidden">
          <Sidebar />
        </div>
      </div>
      <Footer />
    </div>
  );
}
