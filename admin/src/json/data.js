import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegCommentDots, FaUsers } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { TbCategory2 } from "react-icons/tb";

export const menuData = [
  {
    title: "Navigation",
    items: [
      {
        label: "Dashboard",
        icon: AiOutlineDashboard, // Replace with actual icon class or path
        path: "/",
      },
    ],
  },
  {
    title: "Blogs",
    items: [
      {
        label: "Posts",
        icon: HiMiniPencilSquare, // Replace with actual icon class or path
        path: "/posts",
      },
      {
        label: "Categories",
        icon: TbCategory2, // Replace with actual icon class or path
        path: "/post-categories",
      },
      {
        label: "Comments",
        icon: FaRegCommentDots, // Replace with actual icon class or path
        path: "/post-comments",
      },
    ],
  },
  {
    title: "Users",
    items: [
      {
        label: "Customers",
        icon: FaUsers, // Replace with actual icon class or path
        path: "/customers",
      },
      {
        label: "Users",
        icon: FaUserGroup, // Replace with actual icon class or path
        path: "/users",
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        label: "Site Settings",
        icon: FiSettings, // Replace with actual icon class or path
        path: "/site-setting",
      },
     
    ],
  },
];

export const blogPostsData = [
  {
    id: 1,
    title: "Understanding React Hooks",
    category: "Ecommerce",
    date: "2024-11-26",
    status: "Published",
  },
  {
    id: 2,
    title: "10 Tips for Writing Better JavaScript",
    category: "News",
    date: "2024-11-20",
    status: "Draft",
  },
  {
    id: 3,
    title: "Tailwind CSS: A Comprehensive Guide",
    category: "Flash Sale",
    date: "2024-10-15",
    status: "Published",
  },
  {
    id: 4,
    title: "How to Build a MERN Stack App",
    category: "Trending",
    date: "2024-09-12",
    status: "Draft",
  },
  {
    id: 5,
    title: "Understanding React Hooks",
    category: "Ecommerce",
    date: "2024-11-26",
    status: "Published",
  },
  {
    id: 6,
    title: "10 Tips for Writing Better JavaScript",
    category: "News",
    date: "2024-11-20",
    status: "Published",
  },
  {
    id: 7,
    title: "Tailwind CSS: A Comprehensive Guide",
    category: "Flash Sale",
    date: "2024-10-15",
    status: "Published",
  },
  {
    id: 8,
    title: "How to Build a MERN Stack App",
    category: "Trending",
    date: "2024-09-12",
    status: "Draft",
  },
];
