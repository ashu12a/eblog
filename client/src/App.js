import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useGlobalLoading } from "./context/LoadingContext";

// pages
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Post from "./pages/Post";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";

// components
import Topbar from "./components/menu/Topbar";
import Navbar from "./components/menu/Navbar";


function App() {
  const { isLoading } = useGlobalLoading();

  return (
    <BrowserRouter>
      <Topbar />
      <ToastContainer />
      <Navbar />
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-white flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
        </div>
      )}
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/profile" Component={Profile} />
        <Route path="/sign-in" Component={Signin} />
        <Route path="/sign-up" Component={Signup} />
        <Route path="/forgot-password" Component={ForgotPassword} />
        <Route path="/category/:slug" Component={Post} />
        <Route path="/post-detail/:slug" Component={PostDetail} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
