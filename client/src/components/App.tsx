import React, { useEffect, useState } from "react";
import { Login } from "../pages/login";
import { Route, Routes, useLocation } from "react-router-dom";
import { SignUp } from "../pages/signup";
import { Header } from "./Header";
import { Home } from "../pages/home";
import { Footer } from "./Footer";
import { Dashboard } from "../pages/dashboard";
import { Post, User } from "../interfaces/interfaces";
import { checkUserAuth, getAllPosts } from "../services";
import { CreatePost } from "../pages/createPost";
import { UserPosts } from "../pages/userPosts";
import { DashArea } from "./DashArea";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.min.css";
import { PostPage } from "../pages/post";
import { Profile } from "../pages/profile";
import { MyComments } from "../pages/myComments";
import { About } from "../pages/about";
import { Contact } from "../pages/contact";

export const App: React.FC = () => {
  const location = useLocation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState<string>("");
  // eslint-disable-next-line
  const [currentPost, setCurrentPost] = useState<Post | null | undefined>(null);
  const [checkedUser, setCheckedUser] = useState<User>({
    id: null,
    name: "",
    email: "",
    password: "",
  });

  //Is Login
  const [isLogin, setIsLogin] = useState<boolean>(false);
  useEffect(() => {
    checkUserAuth().then((res) => {
      localStorage.setItem("isLogin", res?.data?.isAuthenticated);
      setIsLogin(res?.data?.isAuthenticated);
      setCheckedUser(res?.data?.USER);
    });
  }, [isLogin]);

  //Load Posts
  const loadPosts = async () => {
    await getAllPosts().then((res) => {
      setPosts(res?.data?.posts);
    });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  //Search
  useEffect(() => {
    if (!search) {
      setFilteredPosts(posts);
    }
    const searchedPosts = posts.filter((post) => {
      const searchText = search.toLowerCase();
      const matchedPosts = post?.title?.toLowerCase().includes(searchText);

      return matchedPosts;
    });

    if (search) {
      setFilteredPosts(searchedPosts);
    }
  }, [search, posts]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              filteredPosts={filteredPosts}
              posts={posts}
              setSearch={setSearch}
            />
          }
        />
        <Route
          path="/post/:postId"
          element={
            <PostPage
              isLogin={isLogin}
              posts={posts}
              checkedUser={checkedUser}
              filteredPosts={filteredPosts}
            />
          }
        />
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={isLogin ? <Dashboard /> : <Login />}>
          <Route
            path=""
            element={
              isLogin ? (
                <DashArea checkedUser={checkedUser} posts={posts} />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="post"
            element={
              isLogin ? (
                <UserPosts
                  posts={posts}
                  checkedUser={checkedUser}
                  currentPost={currentPost}
                  setCurrentPost={setCurrentPost}
                />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="post/create"
            element={isLogin ? <CreatePost /> : <Login />}
          />
          <Route
            path="profile"
            element={
              isLogin ? <Profile checkedUser={checkedUser} /> : <Login />
            }
          />
          <Route
            path="comments"
            element={
              isLogin ? <MyComments checkedUser={checkedUser} /> : <Login />
            }
          />
        </Route>

        <Route path="/about" element={<About posts={posts} />} />
        <Route path="/contact" element={<Contact posts={posts} />} />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/signup" element={<SignUp setIsLogin={setIsLogin} />} />
      </Routes>
      <Footer />
    </div>
  );
};
