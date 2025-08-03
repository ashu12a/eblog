import React from "react";
import Breadcrum from "../components/breadcrum";
import { useLocation, useParams } from "react-router-dom";
import { Card7 } from "../components/card";

import nopost from "../assets/img/nopost.png";

import Footer from "../components/menu/Footer";
import Sidebar from "../components/menu/Sidebar";
import { GetPostsBySubCat } from "../api/posts";

import { useGlobalLoading } from "../context/LoadingContext";
import { baseuri } from "../utils/constant";

export default function Post() {
  const location = useLocation();
  React.useEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname]);


  const { slug } = useParams();

  const [posts, setPosts] = React.useState([]);
  const [pagination, setPagination] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loadingMore, setLoadingMore] = React.useState(false);

  const { startLoading, stopLoading } = useGlobalLoading();


  React.useEffect(() => {
    (async () => {
      if (currentPage === 1) {
        startLoading();
      } else {
        setLoadingMore(true);
      }

      try {
        const response = await GetPostsBySubCat(slug, currentPage);

        if (currentPage === 1) {
          setPosts(response?.data || []);
        } else {
          setPosts((prev) => [...prev, ...(response?.data || [])]);
        }

        setPagination(response?.pagination);
      } catch (error) {
        console.error("Failed to load posts", error);
      }

      if (currentPage === 1) {
        stopLoading();
      } else {
        setLoadingMore(false);
      }
    })();
    // eslint-disable-next-line
  }, [slug, currentPage]);

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
          {posts.map((item) => (
            <div key={item._id}>
              <Card7
                category={item.subcategory || item.category?.title}
                img={`${baseuri}/public/${item?.thumbnail}`}
                author="Elon Mask"
                read="3"
                views="1.9k"
                title={item.title}
                slug={item.slug}
                description={item.excerpt}
              />
            </div>
          ))}

          {posts.length < 1 && (
            <div className="flex justify-center items-center h-[400px]">
              <img src={nopost} alt="nopost" width={300} height={300} />
            </div>
          )}

          {(pagination?.totalPages > currentPage && posts.length > 0) && (
            <div className="my-10 text-center">
              <button
                className="bg-primary text-white px-10 py-2 hover:bg-black transition duration-500 cursor-pointer disabled:opacity-60"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>

        <div className="w-[25%] lg:block hidden">
          <Sidebar />
        </div>
      </div>

      <Footer />
    </div>
  );
}
