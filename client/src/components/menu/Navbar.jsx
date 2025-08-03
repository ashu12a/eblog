import React from "react";
import logo from "../../assets/img/logo.svg";

import { io } from "socket.io-client";
import { CiSearch } from "react-icons/ci";
import { RiArrowDownSLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { GetPrimaryMenu } from "../../api/others";
import { useGlobalLoading } from "../../context/LoadingContext";
import { baseuri } from "../../utils/constant";
import Maintenance from "../Maintenance";
import { useQuery } from "@tanstack/react-query";

// socket connection and retry limitation for 5 times
const socket = io(baseuri);

export default function Navbar() {
  const location = useLocation();
  // const [menuItems, setMenuItems] = React.useState([]);
  const { startLoading, stopLoading } = useGlobalLoading();

  const [isMaintenance, setIsMaintenance] = React.useState(false);


  const { data: menuItemsData, isLoading: isLoadingMenuItems } = useQuery({
    queryKey: ["menuItems", location.pathname],
    queryFn: () => GetPrimaryMenu(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const menuItems = menuItemsData?.data || [];

  const isLoading = isLoadingMenuItems;


 



  React.useEffect(() => {
    if(isLoading) {
      startLoading();
    }else{
      stopLoading();
    }
  }, [isLoading]);


  React.useEffect(() => {
    socket.on("maintenance", (data) => {
      setIsMaintenance(data);
    });
  }, []);





  return (
    <div className="grid grid-cols-5 gap-2 items-center text-sm py-6 px-2">
      {/* Maintaince Block  */}
      {isMaintenance && <Maintenance />}

      <Link to="/">
        <img src={logo} alt="" className="m-auto" />
      </Link>
      <div className="col-span-3 m-auto ">
        <ul className="gap-8 justify-center items-center text-lg lg:flex hidden">
          <li className="menu-item">
            <Link to="/" className="flex gap-1 items-center hover:text-primary">
              Home
            </Link>
          </li>
          {menuItems?.map((item, index) => (
            <li className="group/outer relative" key={index}>
              {item.subCategories.length === 0 ? (
                <Link
                  to={`/category/${item.slug}`}
                  className="flex gap-1 items-center hover:text-primary"
                >
                  {item.title}
                </Link>
              ) : (
                <span className="flex gap-1 items-center hover:text-primary">
                  {item.title}
                  <RiArrowDownSLine size={22} />
                </span>
              )}

              {item.subCategories.length > 0 && (
                <ul className="absolute z-[99] w-[200px]  top-6  invisible group-hover/outer:visible opacity-0 group-hover/outer:opacity-100 transition duration-300">
                  <div className="mt-4 shadow rounded bg-white p-2 border-t-2 border-primary flex flex-col gap-2">
                    {item.subCategories.map((subItem) => (
                      <li
                        key={subItem}
                        className="group/inner relative hover:text-primary flex items-center gap-2"
                      >
                        <div className="w-[8px] scale-0 absolute group-hover/inner:scale-100 h-[8px] rounded-full bg-primary transition duration-300"></div>
                        <Link
                          to={`/category/${subItem}`}
                          className="ml-0 group-hover/inner:ml-4 transition-all duration-300"
                        >
                          {subItem}
                        </Link>
                      </li>
                    ))}
                  </div>
                </ul>
              )}
            </li>
          ))}

          {/* <li className="menu-item">
            <Link
              to="/post/Sports"
              className="flex gap-1 items-center hover:text-primary"
            >
              Sports
            </Link>
          </li> */}
        </ul>
      </div>
      <div className="m-auto">
        <CiSearch size={22} className="cursor-pointer" />
      </div>
    </div>
  );
}
