import React from 'react'
import { Card4, Card6 } from "../../components/card";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaPinterest, FaYoutube } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import cardimg18 from "../../assets/img/18.jpg";
import cardimg19 from "../../assets/img/19.jpg";
import cardimg20 from "../../assets/img/20.jpg";
import cardimg21 from "../../assets/img/21.jpg";
import cardimg22 from "../../assets/img/22.jpg";
import catimg1 from "../../assets/img/category-01.jpg";
import catimg2 from "../../assets/img/category-02.jpg";
import catimg3 from "../../assets/img/category-03.jpg";
import adimg from "../../assets/img/ad.jpg";

import { getPostsByLabel } from "../../api/posts";
import { GetPrimaryMenu } from "../../api/others";
import { baseuri } from "../../utils/constant";

export default function Sidebar() {
  // API queries for posts and categories
  const { data: labelPostsData, isLoading: isLoadingLabelPosts } = useQuery({
    queryKey: ["sidebar-posts", "featured", "popular"],
    queryFn: () =>
      getPostsByLabel({ label: ["featured", "popular"], limit: 8 }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["sidebar-categories"],
    queryFn: () => GetPrimaryMenu(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const labelPosts = labelPostsData?.data || [];
  const categories = categoriesData?.data || [];

  // Filter posts by labels
  const featuredPosts = labelPosts
    .filter((post) => post.label === "featured")
    .slice(0, 1); // Only show 1 featured post in sidebar

  const popularPosts = labelPosts
    .filter((post) => post.label === "popular")
    .slice(0, 4); // Show 4 popular posts

  return (
    <div>
        <div className="lg:block hidden">
          <h2 className="text-xl text-center bg-gray-100 py-2 max-w-[300px] m-auto">
            Feature Post
          </h2>
          <div className="my-10">
            {featuredPosts?.length > 0 ? (
              featuredPosts.map((post, index) => (
                <Card4
                  key={index}
                  category={post.category.title}
                  img={`${baseuri}/public/${post.thumbnail}`}
                  read={post.readTime || "3"}
                  views={post.views || "1.9k"}
                  title={post.title}
                  slug={post.slug}
                />
              ))
            ) : (
              <Card4
                category="Technology"
                img={cardimg18}
                read="3"
                views="1.9k"
                title="How Can A Wellness Retreat Help Reconnect You to Your"
              />
            )}
          </div>
        </div>
        <div className="lg:block hidden">
          <h2 className="text-xl text-center bg-gray-100 py-2 max-w-[300px] m-auto">
            Popular Post
          </h2>
          <div className="my-16 flex flex-col gap-3">
            {popularPosts?.length > 0 ? (
              popularPosts.map((post, index) => (
                <Card6
                  key={index}
                  img={`${baseuri}/public/${post.thumbnail}`}
                  read={post.readTime || "3"}
                  views={post.views || "1.9k"}
                  title={post.title}
                  slug={post.slug}
                />
              ))
            ) : (
              <>
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
              </>
            )}
          </div>

          <h2 className="text-xl text-center bg-gray-100 py-2 max-w-[300px] m-auto">
            Browse Category
          </h2>
          <div className="flex flex-col gap-4 my-6">
            {categories?.length > 0 ? (
              categories.map((category, index) => (
                <Link to={`/category/${category.title}`} key={index}>
                  <div className="flex relative bg-neutral-800 h-[50px] w-full cursor-pointer">
                    <h4 className="absolute w-full h-full flex justify-center items-center text-white font-semibold">
                      {category.title}
                    </h4>
                  </div>
                </Link>
              ))
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
        <div className="lg:block hidden">
          <h2 className="text-xl text-center bg-gray-100 py-2 max-w-[300px] m-auto">
            Popular Post
          </h2>
          <div className="my-16 flex flex-col gap-3">
            {popularPosts?.length > 0 ? (
              popularPosts.map((post, index) => (
                <Card6
                  key={index}
                  img={`${baseuri}/public/${post.thumbnail}`}
                  read={post.readTime || "3"}
                  views={post.views || "1.9k"}
                  title={post.title}
                  slug={post.slug}
                />
              ))
            ) : (
              <>
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
              </>
            )}
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
  )
}
