import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useUserData from "../../hooks/useUserData";
import UserBio from "../../components/UserBio/UserBio";
import "./UserPage.css";

import { useParams } from "react-router-dom";

import UserBioButtons from "../../components/UserBioButtons/UserBioButtons";
import PostsList from "../../components/PostsList/PostsList";

const UserPage = () => {
  const { id: userId } = useParams();
  const { userData, updateUserData } = useUserData({ userId });
  const { posts } = useSelector((data) => data.postsReducer);

  useEffect(() => {
    updateUserData({ userId });
  }, [userId]);

  if (!userData) return null;

  const filteredPosts = posts?.filter((post) => post.author.id == userId);

  return (
    <>
      <UserBio {...userData}>
        <UserBioButtons userId={userId} userData={userData} />
      </UserBio>

      <PostsList posts={filteredPosts} />
    </>
  );
};

export default UserPage;
