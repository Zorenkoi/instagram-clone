import "./PostsList.css";
import { useDispatch } from "react-redux";
import useMyData from "../../hooks/useMyData";
import { openModal } from "../../redux/slices/modalSlice";
import MiniPostCard from "../MiniPostCard/MiniPostCard";

const PostsList = ({ posts }) => {
  const { myId } = useMyData();
  const dispatch = useDispatch();

  if (!posts) return;

  const postsForModal = posts.map((post) => {
    return { postId: post.id };
  });

  return (
    <div className="posts-container">
      {posts.map(({ likes, comments, id, imgUrl, author }, i) => {
        const isYourPost = String(author.id) === String(myId);

        const handleOpenModal = () => {
          dispatch(
            openModal({
              posts: postsForModal,
              postId: id,
            })
          );
        };

        return (
          <MiniPostCard
            key={id}
            handleOpenModal={handleOpenModal}
            i={i}
            myId={myId}
            postId={id}
            imgUrl={imgUrl}
            comments={comments}
            likes={likes}
            isYourPost={isYourPost}
          />
        );
      })}
    </div>
  );
};

export default PostsList;
