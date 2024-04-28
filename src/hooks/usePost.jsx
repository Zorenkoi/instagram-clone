import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const usePost = ({ postId }) => {
  const [post, setPost] = useState(null);
  const { posts } = useSelector((data) => data.postsReducer);

  const updatePost = ({ postId }) => {
    if (posts && postId) {
      const post = posts.find((post) => String(post.id) === String(postId));
      setPost(post);
    }
  };

  useEffect(() => {
    updatePost({ postId });
  }, [posts]);

  return {
    post,
    updatePost,
  };
};

export default usePost;
