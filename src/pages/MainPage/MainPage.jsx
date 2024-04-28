import { useSelector } from "react-redux";
import { useState } from "react";
import UserFilter from "../../components/UserFilter/UserFilter";
import "./MainPage.css";
import SortSelector from "../../components/SortSelector/SortSelector";
import PostsList from "../../components/PostsList/PostsList";

const MainPage = () => {
  const { posts, isLoading, isError } = useSelector(
    (data) => data.postsReducer
  );

  const [sortType, setSortType] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Errror</div>;
  if (!posts) return <div>Errror</div>;

  const sortedPosts = sortPosts({ posts, sortType });

  return (
    <div className="main-page">
      <UserFilter />

      <SortSelector value={sortType} setValue={setSortType} />

      <PostsList posts={sortedPosts} />
    </div>
  );
};

function sortPosts({ posts, sortType }) {
  const clonePosts = structuredClone(posts);

  switch (sortType) {
    case "popular":
      return clonePosts.sort((a, b) => {
        return b.likes.length - a.likes.length;
      });

    case "date":
      return clonePosts.sort((a, b) => {
        return new Date(b.dateString) - new Date(a.dateString);
      });

    default:
      return posts;
  }
}

export default MainPage;
