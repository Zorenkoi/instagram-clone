import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "./redux/slices/postsSlice";
import { getUsers } from "./redux/slices/usersSlice";
import api from "./api/api";

import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import UserPage from "./pages/UserPage/UserPage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import EditPostPage from "./pages/EditPostPage/EditPostPage";
import Layout from "./components/Layout/Layout";
import AddPostPage from "./pages/AddPostPage/AddPostPage";
import AnimateModalPost from "./components/ModalPost/ModalPost";
import AddUserPage from "./pages/AddUserPage/AddUserPage";
import ChooseUserList from "./components/ChooseUserList/ChooseUserList";
import ModalConfirm from "./components/ModalConfirm/ModalConfirm";

function App() {
  const dispatch = useDispatch();

  const up = async () => {
    const posts = await api.getPosts();

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const newPost = structuredClone(post);
      newPost.comments = [];

      await api.mutatePost(newPost.id, newPost);
    }
  };

  const initialization = () => {
    dispatch(getPosts());
    dispatch(getUsers());
  };

  useEffect(initialization, []);

  return (
    <BrowserRouter>
      <AnimateModalPost />
      <ChooseUserList />
      <ModalConfirm />

      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<UserPage />} />
          <Route path="/editprofile" element={<EditProfilePage />} />
          <Route path="/adduser" element={<AddUserPage />} />
          <Route path="/editpost/:id" element={<EditPostPage />} />
          <Route path="/addpost" element={<AddPostPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
