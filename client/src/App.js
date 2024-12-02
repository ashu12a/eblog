import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Topbar from "./components/menu/Topbar";
import Navbar from "./components/menu/Navbar";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Post from "./pages/Post";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <ToastContainer/>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/profile" Component={Profile} />
        <Route path="/sign-in" Component={Signin} />
        <Route path="/sign-up" Component={Signup} />
        <Route path="/forgot-password" Component={ForgotPassword} />
        <Route path="/post/:slug" Component={Post} />
        <Route path="/post-detail/:slug" Component={PostDetail} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
