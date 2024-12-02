import React from "react";
import logo from "../../assets/img/logo.svg";
import { CiSearch } from "react-icons/ci";
import { RiArrowDownSLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="grid grid-cols-5 gap-2 items-center text-sm py-6 px-2">
      <Link to='/'>
        <img src={logo} alt="" className="m-auto" />
      </Link>
      <div className="col-span-3 m-auto ">
      <ul className="gap-8 justify-center items-center text-lg lg:flex hidden">
        <li className="menu-item">
            <Link to="/" className="flex gap-1 items-center hover:text-primary">Home</Link>
        </li>
        <li className="group/outer relative">
            <Link to="#" className="flex gap-1 items-center hover:text-primary">
            Technology <RiArrowDownSLine size={22}/>
            </Link>
            <ul className="absolute z-[99] w-[200px] top-6  invisible group-hover/outer:visible opacity-0 group-hover/outer:opacity-100 transition duration-300">
                <div className="mt-4 shadow rounded bg-white p-2 border-t-2 border-primary flex flex-col gap-2">
                    <li className="group/inner relative hover:text-primary flex items-center gap-2">
                        <div className="w-[8px] scale-0 absolute group-hover/inner:scale-100 h-[8px] rounded-full bg-primary transition duration-300"></div> 
                        <Link to="/post/Web Development" className="ml-0 group-hover/inner:ml-4 transition-all duration-300">Web Development</Link>
                    </li>
                    <li className="group/inner relative hover:text-primary flex items-center gap-2">
                        <div className="w-[8px] scale-0 absolute group-hover/inner:scale-100 h-[8px] rounded-full bg-primary transition duration-300"></div> 
                        <Link to="/post/Mobile Apps" className="ml-0 group-hover/inner:ml-4 transition-all duration-300">Mobile Apps</Link>
                    </li>
                    <li className="group/inner relative hover:text-primary flex items-center gap-2">
                        <div className="w-[8px] scale-0 absolute group-hover/inner:scale-100 h-[8px] rounded-full bg-primary transition duration-300"></div> 
                        <Link to="/post/Artificial Intelligence" className="ml-0 group-hover/inner:ml-4 transition-all duration-300">Artificial Intelligence</Link>
                    </li>
                    <li className="group/inner relative hover:text-primary flex items-center gap-2">
                        <div className="w-[8px] scale-0 absolute group-hover/inner:scale-100 h-[8px] rounded-full bg-primary transition duration-300"></div> 
                        <Link to="/post/Cybersecurity" className="ml-0 group-hover/inner:ml-4 transition-all duration-300">Cybersecurity</Link>
                    </li>
                    <li className="group/inner relative hover:text-primary flex items-center gap-2">
                        <div className="w-[8px] scale-0 absolute group-hover/inner:scale-100 h-[8px] rounded-full bg-primary transition duration-300"></div> 
                        <Link to="/post/Cloud Computing" className="ml-0 group-hover/inner:ml-4 transition-all duration-300">Cloud Computing</Link>
                    </li>
                    <li className="group/inner relative hover:text-primary flex items-center gap-2">
                        <div className="w-[8px] scale-0 absolute group-hover/inner:scale-100 h-[8px] rounded-full bg-primary transition duration-300"></div> 
                        <Link to="/post/Gadgets & Reviews" className="ml-0 group-hover/inner:ml-4 transition-all duration-300">Gadgets & Reviews</Link>
                    </li>
                </div>
            </ul>
        </li>
        <li className="group/outer relative">
            <Link to="#" className="flex gap-1 items-center hover:text-primary">
            Lifestyle <RiArrowDownSLine size={22}/>
            </Link>
            <ul className="absolute z-[99] w-[200px]  top-6  invisible group-hover/outer:visible opacity-0 group-hover/outer:opacity-100 transition duration-300">
                <div className="mt-4 shadow rounded bg-white p-2 border-t-2 border-primary flex flex-col gap-2">
                    <li className="group/inner relative hover:text-primary flex items-center gap-2">
                        <div className="w-[8px] scale-0 absolute group-hover/inner:scale-100 h-[8px] rounded-full bg-primary transition duration-300"></div> 
                        <Link to="/post/LifeStyle" className="ml-0 group-hover/inner:ml-4 transition-all duration-300">Travel</Link>
                    </li>
                    <li className="group/inner relative hover:text-primary flex items-center gap-2">
                        <div className="w-[8px] scale-0 absolute group-hover/inner:scale-100 h-[8px] rounded-full bg-primary transition duration-300"></div> 
                        <Link to="/post/LifeStyle" className="ml-0 group-hover/inner:ml-4 transition-all duration-300">Fashion</Link>
                    </li>
                    <li className="group/inner relative hover:text-primary flex items-center gap-2">
                        <div className="w-[8px] scale-0 absolute group-hover/inner:scale-100 h-[8px] rounded-full bg-primary transition duration-300"></div> 
                        <Link to="/post/LifeStyle" className="ml-0 group-hover/inner:ml-4 transition-all duration-300">Home Decor</Link>
                    </li>
                    <li className="group/inner relative hover:text-primary flex items-center gap-2">
                        <div className="w-[8px] scale-0 absolute group-hover/inner:scale-100 h-[8px] rounded-full bg-primary transition duration-300"></div> 
                        <Link to="/post/LifeStyle" className="ml-0 group-hover/inner:ml-4 transition-all duration-300">Relationships</Link>
                    </li>
                </div>
            </ul>
        </li>
        <li className="group/outer relative">
            <Link to="#" className="flex gap-1 items-center hover:text-primary">
            Entertainment <RiArrowDownSLine size={22}/>
            </Link>
            <ul className="absolute z-[99] w-[200px]  top-6  invisible group-hover/outer:visible opacity-0 group-hover/outer:opacity-100 transition duration-300">
                <div className="mt-4 shadow rounded bg-white p-2 border-t-2 border-primary flex flex-col gap-2">
                    <li className="group/inner relative hover:text-primary flex items-center gap-2">
                        <div className="w-[8px] scale-0 absolute group-hover/inner:scale-100 h-[8px] rounded-full bg-primary transition duration-300"></div> 
                        <Link to="/post/Entertainment" className="ml-0 group-hover/inner:ml-4 transition-all duration-300">Music</Link>
                    </li>
                    <li className="group/inner relative hover:text-primary flex items-center gap-2">
                        <div className="w-[8px] scale-0 absolute group-hover/inner:scale-100 h-[8px] rounded-full bg-primary transition duration-300"></div> 
                        <Link to="/post/Entertainment" className="ml-0 group-hover/inner:ml-4 transition-all duration-300">Gaming</Link>
                    </li>
                    <li className="group/inner relative hover:text-primary flex items-center gap-2">
                        <div className="w-[8px] scale-0 absolute group-hover/inner:scale-100 h-[8px] rounded-full bg-primary transition duration-300"></div> 
                        <Link to="/post/Entertainment" className="ml-0 group-hover/inner:ml-4 transition-all duration-300">Books & Literature</Link>
                    </li>
                    <li className="group/inner relative hover:text-primary flex items-center gap-2">
                        <div className="w-[8px] scale-0 absolute group-hover/inner:scale-100 h-[8px] rounded-full bg-primary transition duration-300"></div> 
                        <Link to="/post/Entertainment" className="ml-0 group-hover/inner:ml-4 transition-all duration-300">Movies & TV Shows</Link>
                    </li>
                    <li className="group/inner relative hover:text-primary flex items-center gap-2">
                        <div className="w-[8px] scale-0 absolute group-hover/inner:scale-100 h-[8px] rounded-full bg-primary transition duration-300"></div> 
                        <Link to="/post/Entertainment" className="ml-0 group-hover/inner:ml-4 transition-all duration-300">Celebrity News</Link>
                    </li>
                </div>
            </ul>
        </li>
        <li className="menu-item">
            <Link to="/post/Science" className="flex gap-1 items-center hover:text-primary">Science</Link>
        </li>
        <li className="menu-item">
            <Link to="/post/Sports" className="flex gap-1 items-center hover:text-primary">Sports</Link>
        </li>
        </ul>
      </div>
      <div className="m-auto">
        <CiSearch size={22} className="cursor-pointer" />
      </div>      
    </div>
  );
}
