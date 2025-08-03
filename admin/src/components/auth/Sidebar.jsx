import React, { useEffect, useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { RiMenu2Fill, RiMenu3Fill } from "react-icons/ri";
import { Link, Outlet, useLocation } from "react-router-dom";
import { menuData } from "../../json/data";
import { useAuth } from "../../context/AuthContext";
import { IoIosLogOut, IoMdLogOut } from "react-icons/io";
import Logo from "../../assets/logo.svg";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaUserCog } from "react-icons/fa";
import { useGlobalLoading } from "../../context/LoadingContext";

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  const { isLoading } = useGlobalLoading();

  //   ************************** Auto Minimize Sidebar ********************************

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Function to handle screen resizing
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false); // Auto-collapse sidebar on mobile
      } else {
        setIsSidebarOpen(true); // Open sidebar on larger screens
      }
    };

    // Set the initial state based on the screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // *********************************** Profile Popup ********************************
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const popupRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //   ******************************** Returning Component ********************************

  return (
    <div className="flex min-h-screen bg-neutral-100 relative">
      {/* ************sidebar section***********  */}
      <div
        className={`${
          isSidebarOpen && "w-[20%]"
        } w-[0px] overflow-hidden transition-all duration-300 bg-white border-r border-neutral-200`}
      >
        <img className="w-[120px] m-6" src={Logo} alt="Logo." />
        <div>
          {menuData.map((menu, index) => (
            <div className="my-4" key={index}>
              <p className="text-neutral-500 text-xs px-5">{menu.title}</p>
              {menu.items.map((item, subindex) => (
                <Link to={item.path} key={subindex}>
                  <div
                    className={`my-2 py-2 pl-8 flex gap-2 items-center ${
                      location.pathname === item.path
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-blue-50 text-neutral-700"
                    }`}
                  >
                    <item.icon size={22} />
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="w-[100%]">
        {/* ***********navbar*************** */}
        <div className="border-b border-neutral-200 bg-white flex justify-between items-center px-4">
          <div className="flex items-center">
            {/* toggle button  */}
            <button
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen);
              }}
              className="p-3 my-2 bg-neutral-100 border border-neutral-200 rounded hover:border-blue-400 duration-300"
            >
              {isSidebarOpen ? (
                <RiMenu3Fill size={16} />
              ) : (
                <RiMenu2Fill size={16} />
              )}
            </button>
            {/* Search  */}
            <div className="mx-4 md:flex hidden  gap-2 items-center border border-neutral-200 hover:border-blue-400 rounded px-3">
              <IoSearchSharp size={16} className="text-neutral-500" />
              <input
                type="text"
                className="outline-none p-2"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 relative">
            {/* user profile */}
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => setIsPopupOpen(!isPopupOpen)}
            >
              <img
                src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
                alt="User Profile"
                className="w-10 h-10 rounded-full"
              />
              <p className="text-neutral-700 text-lg font-semibold md:block hidden">
                John Doe
              </p>
            </div>
            {isPopupOpen && (
              <div
                ref={popupRef}
                className="absolute top-10 right-0 py-2 transition-all duration-300"
              >
                <div className="w-[270px] pb-2 bg-white border border-neutral-300 rounded">
                  <div className="flex items-center p-2">
                    <img
                      src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
                      alt="User Profile"
                      className="w-14 h-14 rounded-full"
                    />
                    <div className="-mt-1">
                      <p className="text- font-semibold">John Doe</p>
                      <p className="text-xs text-neutral-500">Administrator</p>
                    </div>

                    <div className="ml-auto mx-4">
                      <button
                        onClick={logout}
                        className="p-2 bg-neutral-100 hover:bg-neutral-200 rounded"
                        title="logout"
                      >
                        <IoMdLogOut />
                      </button>
                    </div>
                  </div>
                  <Link to="">
                    <div className="px-4 py-2 bg-blue-100 w-full flex gap-4 items-center">
                      <AiOutlineDashboard
                        size={20}
                        className="text-neutral-700"
                      />{" "}
                      Dashboard
                    </div>
                  </Link>
                  <Link to="">
                    <div className="px-4 py-2 hover:bg-neutral-100 w-full flex gap-4 items-center">
                      <FaUserCog size={20} className="text-neutral-700" />{" "}
                      Profile Settings
                    </div>
                  </Link>
                  <div
                    className="px-4 py-2 hover:bg-neutral-100 w-full flex gap-4 items-center cursor-pointer"
                    onClick={logout}
                  >
                    <IoMdLogOut size={20} className="text-neutral-700" /> Logout
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ✅ Show overlay loader, don't block app tree */}
        {isLoading && (
          <div className="fixed top-0 lg:left-64 left-0 right-0 bottom-0 bg-white flex justify-center items-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}
