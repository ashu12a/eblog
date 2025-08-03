import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NotFound from "./components/other/NotFound";
import Dashboard from "./pages/Dashboard";
import Login from "./components/auth/Login";
import Posts from "./pages/blog/Posts";
import PrivateRoute from "./components/PrivateRoute";
import CreatePosts from "./components/form/blog/CreatePosts";
import UpdatePosts from "./components/form/blog/updatePost";
import PostCategories from "./pages/blog/PostCategories";
import PostComments from "./pages/blog/PostComments";
import SiteSetting from "./pages/other/SiteSetting";



function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes  */}
        <Route path="/login" Component={Login} />

        {/* Protected Routes  */}
        <Route Component={PrivateRoute}>
          <Route path="/" Component={Dashboard} />
          <Route path="/posts" Component={Posts} />
          <Route path="/posts/create" Component={CreatePosts} />
          <Route path="/posts/update/:id" Component={UpdatePosts} />
          <Route path="/post-categories" Component={PostCategories} />
          <Route path="/post-comments" Component={PostComments} />

          {/* Site Pages  */}
          <Route path="/site-setting" Component={SiteSetting} />
        </Route>

        {/* Not Found Route  */}
        <Route path="*" Component={NotFound} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
