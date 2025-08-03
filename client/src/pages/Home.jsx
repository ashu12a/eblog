import "swiper/css";
import "swiper/css/pagination";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Slide1 } from "../components/slides";

import adimg from "../assets/img/ad.jpg";

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
import Metas from "../components/menu/Metas";
import { useGlobalLoading } from "../context/LoadingContext";
import { getPostsByLabel, GetPostsWithCat } from "../api/posts";
import { baseuri } from "../utils/constant";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { GetPrimaryMenu } from "../api/others";

export default function Home() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  


  const { startLoading, stopLoading } = useGlobalLoading();
  
  // State for load more functionality
  const [latestPostsLimit, setLatestPostsLimit] = useState(5);
  const [allLatestPosts, setAllLatestPosts] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data: labelPostsData, isLoading: isLoadingLabelPosts } = useQuery({
    queryKey: ["posts", "featured", "8"],
    queryFn: () =>
      getPostsByLabel({ label: ["featured", "trending", "popular"], limit: 8 }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: categoryPostsData, isLoading: isLoadingCategoryPosts } =
    useQuery({
      queryKey: ["posts", "category", "10"],
      queryFn: () => GetPostsWithCat(),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

  const { data: latestPostsData, isLoading: isLoadingLatestPosts } = useQuery({
    queryKey: ["posts", "latest", latestPostsLimit.toString()],
    queryFn: () => getPostsByLabel({ label: "latest", limit: latestPostsLimit }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => GetPrimaryMenu(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  // Load more function
  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    try {
      const newLimit = latestPostsLimit + 5;
      setLatestPostsLimit(newLimit);
      
      // Fetch more posts
      const response = await getPostsByLabel({ label: "latest", limit: newLimit });
      if (response?.data) {
        setAllLatestPosts(response.data);
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Update allLatestPosts when latestPostsData changes
  useEffect(() => {
    if (latestPostsData?.data) {
      setAllLatestPosts(latestPostsData.data);
    }
  }, [latestPostsData]);

  const categories = categoriesData?.data || [];

  const latestPosts = allLatestPosts.length > 0 ? allLatestPosts : (latestPostsData?.data || []);

  const loading = isLoadingLabelPosts || isLoadingCategoryPosts;
  const labelPosts = labelPostsData?.data || [];

  const featuredPosts = labelPosts
    .filter((post) => post.label === "featured")
    .slice(0, 5);

  // i want last item of featuredPosts
  const OnefeaturedPosts = labelPosts
    .filter((post) => post.label === "featured")
    .slice(featuredPosts?.length - 1, featuredPosts?.length);

  const trendingPosts = labelPosts
    .filter((post) => post.label === "trending")
    .slice(0, 4);
  const popularPosts = labelPosts
    .filter((post) => post.label === "popular")
    .slice(0, 8);

  const categoryPosts = categoryPostsData?.data || [];

  useEffect(() => {
    if (loading) {
      startLoading();
    } else {
      stopLoading();
    }
  }, [loading]);

  return (
    <section>
      <Metas
        title="Eblog News Portal"
        description="Eblog is a news portal"
        keywords="Eblog, News, Eblog News"
      />
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
            {featuredPosts?.length > 0 &&
              featuredPosts.map((post, index) => (
                <SwiperSlide key={index}>
                  <Slide1
                    img={`${baseuri}/public/${post.thumbnail}`}
                    category={post.category.title}
                    heading={post.title}
                    slug={post.slug}
                    author={`${post.author.name} - ${new Date(
                      post.createdAt
                    ).toLocaleDateString()}`}
                    read={post.readTime || "60"}
                    views={post.views || "99"}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        {/* -----------------------Trending Content-----------------------  */}
        <div className="bg-white">
          <div className="my-14">
            <h2 className="text-4xl text-center font-semibold">Trending Now</h2>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-8 gap-6 lg:px-20 md:px-16 px-10 text-center">
            {trendingPosts?.length > 0 &&
              trendingPosts.map((post, index) => (
                <Card1
                  key={index}
                  slug={post.slug}
                  img={`${baseuri}/public/${post.thumbnail}`}
                  author={`${post.author.name} - ${new Date(
                    post.createdAt
                  ).toLocaleDateString()}`}
                  title={post.title}
                />
              ))}
          </div>
        </div>

        {/* -------------------------Category & Featured Post--------------------  */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-8 mt-20 lg:px-16 px-4">
          <div className="col-span-3">
            <h2 className="text-4xl font-semibold flex items-center break-keep gap-4">
              <span className="whitespace-nowrap">
                {categoryPosts[0]?.category?.title}
              </span>
              <span className="w-full h-[1px] bg-gray-200 mt-2 rounded"></span>
            </h2>
            <div className="grid lg:grid-cols-2 grid-cols-1  gap-8 my-16">
              <Card2
                category={categoryPosts[0]?.category?.title}
                img={`${baseuri}/public/${categoryPosts[0]?.blogs[0]?.thumbnail}`}
                author={`${
                  categoryPosts[0]?.blogs[0]?.author?.name
                } - ${new Date(
                  categoryPosts[0]?.blogs[0]?.createdAt
                ).toLocaleDateString()}`}
                slug={categoryPosts[0]?.blogs[0]?.slug}
                read={categoryPosts[0]?.blogs[0]?.readTime || "3"}
                views={categoryPosts[0]?.blogs[0]?.views || "1.9k"}
                title={categoryPosts[0]?.blogs[0]?.title}
              />
              <div className="flex flex-col gap-3">
                {categoryPosts[0]?.blogs?.slice(1, 4).map((post, index) => (
                  <Card3
                    category={post.category.title}
                    img={`${baseuri}/public/${post.thumbnail}`}
                    slug={post.slug}
                    read={post.readTime || "3"}
                    views={post.views || "1.9k"}
                    title={post.title}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:block hidden">
            <h2 className="text-xl text-center bg-gray-100 py-2 max-w-[300px] m-auto">
              Feature Post
            </h2>
            <div className="my-16">
              {OnefeaturedPosts?.map((post, index) => (
                <Card4
                  key={index}
                  category={post.category.title}
                  img={`${baseuri}/public/${post.thumbnail}`}
                  read={post.readTime || "3"}
                  views={post.views || "1.9k"}
                  title={post.title}
                />
              ))}
            </div>
          </div>
        </div>

        {/* -------------------------Category & Featured Post 2--------------------  */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 lg:px-16 px-4 mt-10">
          <div className="col-span-3">
            <h2 className="text-4xl font-semibold flex items-center break-keep gap-4">
              <span className="whitespace-nowrap">
                {categoryPosts[1]?.category?.title}
              </span>
              <span className="w-full h-[1px] bg-gray-200 mt-2 rounded"></span>
            </h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 my-16">
              {categoryPosts[1]?.blogs?.slice(0, 3).map((post, index) => (
                <Card5
                  category={post.category.title}
                  img={`${baseuri}/public/${post.thumbnail}`}
                  author={`${post.author.name} - ${new Date(
                    post.createdAt
                  ).toLocaleDateString()}`}
                  read={post.readTime || "3"}
                  views={post.views || "1.9k"}
                  slug={post.slug}
                  title={post.title}
                />
              ))}
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 mb-8 gap-4">
              {categoryPosts[1]?.blogs?.slice(3, 7).map((post, index) => (
                <Card3
                  category={post.category.title}
                  img={`${baseuri}/public/${post.thumbnail}`}
                  read={post.readTime || "3"}
                  views={post.views || "1.9k"}
                  title={post.title}
                  slug={post.slug}
                />
              ))}
            </div>
          </div>
          <div className="col-span-1 lg:block hidden">
            <h2 className="text-xl text-center bg-gray-100 py-2 max-w-[300px] m-auto">
              Popular Post
            </h2>
            <div className="my-16 flex flex-col gap-3">
              {popularPosts?.slice(0, 4)?.map((post, index) => (
                <Card6
                  key={index}
                  img={`${baseuri}/public/${post.thumbnail}`}
                  read={post.readTime || "3"}
                  views={post.views || "1.9k"}
                  title={post.title}
                  slug={post.slug}
                />
              ))}
            </div>

            <h2 className="text-xl text-center bg-gray-100 py-2 max-w-[300px] m-auto">
              Browse Category
            </h2>
            <div className="flex flex-col gap-4 my-6">
              {categories?.map((category, index) => (
                <Link to={`/category/${category.title}`} key={index}>
                  <div className="flex relative bg-neutral-800 h-[50px] w-full cursor-pointer">
                    <h4 className="absolute w-full h-full flex justify-center items-center  text-white font-semibold ">
                      {category.title}
                    </h4>
                  </div>
                </Link>
              ))}
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
            <div className="flex flex-col my-14">
              {latestPosts.map((post, index) => (
                <div key={index}>
                  <Card7
                    author={post.author.name}
                    read={post.readTime || "3"}
                    views={post.views || "1.9k"}
                    title={post.title}
                    description={post.description}
                    slug={post.slug}
                    img={`${baseuri}/public/${post.thumbnail}`}
                    category={post.category.title}
                  />
                </div>
              ))}

              <div className="my-10 m-auto">
                <button 
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="bg-primary text-white px-10 py-2 hover:bg-black transition duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:block hidden">
            <h2 className="text-xl text-center bg-gray-100 py-2 max-w-[300px] m-auto">
              Popular Post
            </h2>
            <div className="my-16 flex flex-col gap-3">
              {popularPosts?.slice(4, 8)?.map((post, index) => (
                <Card6
                  key={index}
                  img={`${baseuri}/public/${post.thumbnail}`}
                  read={post.readTime || "3"}
                  views={post.views || "1.9k"}
                  title={post.title}
                  slug={post.slug}
                />
              ))}
            
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
    </section>
  );
}
