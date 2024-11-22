import React from "react";
import Breadcrum from "../components/breadcrum";
import { Link, useSearchParams } from "react-router-dom";
import { MdOutlineArticle } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { IoHelp, IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";

export default function Profile() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || 'myposts';
  return (
    <div>
      <Breadcrum
        text={[
          { title: "Home", url: "/" },
          { title: "My Profile", url: "/profile" },
        ]}
      />
      <div className="grid lg:grid-cols-7 grid-cols-1 gap-2 lg:px-20 px-6 py-6">
        <div className="col-span-2 border border-gray-300 rounded p-4 flex flex-col gap-4">
          <div className="text-center">
            <img
              src="https://img.freepik.com/free-vector/follow-me-social-business-theme-design_24877-52233.jpg?t=st=1732210839~exp=1732214439~hmac=3b2bb91de5bf051dacc9b769cf24e03b18f64b691d86b8a102878552e91932dc&w=740"
              alt="user"
              className="rounded-full m-auto mb-2 w-[150px] h-[150px] border border-gray-300 shadow"
            />
            <h2 className="text-xl">Ashutosh Sharma</h2>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              to="/profile?q=myposts"
              className={`${query === 'myposts' && 'bg-primary text-white'} w-full px-4 py-2 border border-gray-300 flex items-center gap-2`}
            >
              <MdOutlineArticle size={18} /> My Posts
            </Link>
            <Link
              to="/profile?q=comments"
              className={`${query === 'comments' && 'bg-primary text-white'} w-full px-4 py-2 border border-gray-300 flex items-center gap-2`}
            >
              <FaRegComment size={18} />
              Comments
            </Link>
            <Link
              to="/profile?q=support"
              className={`${query === 'support' && 'bg-primary text-white'} w-full px-4 py-2 border border-gray-300 flex items-center gap-2`}
            >
              <IoHelp size={18} /> Help & Support
            </Link>
            <Link
              to="/profile?q=settings"
              className={`${query === 'settings' && 'bg-primary text-white'} w-full px-4 py-2 border border-gray-300 flex items-center gap-2`}
            >
              <IoSettingsOutline size={18} /> Profile Settings
            </Link>
            <Link
              to="/profile?q=logout"
              className={`${query === 'logout' && 'bg-primary text-white'} w-full px-4 py-2 border border-gray-300 flex items-center gap-2`}
            >
              <IoLogOutOutline size={18} />
              Log Out
            </Link>
          </div>
        </div>
        {/***************** Content Section **************** */}
        <div className="col-span-5 border border-gray-300 rounded flex flex-col gap-4">
            {
                query === "myposts" && <MyPosts />
            }
            {
                query === "comments" && <MyPosts />
            }
        </div>
      </div>
    </div>
  );
}

const MyPosts = () => {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-full">
        <img src="https://miro.medium.com/v2/resize:fit:1400/1*TPwagPQveGkEDJNOOPaqAQ.png" alt="author" className="w-[400px]" />
        <button className="px-6 bg-primary text-white py-2 rounded" >Become an Author</button>
    </div>
  );
};
