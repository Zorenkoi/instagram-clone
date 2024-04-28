import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMyData from "../../hooks/useMyData";
import { toggleLike } from "../../redux/slices/postsSlice";
import likeImg from "../../images/like.svg";
import likeFilledImg from "../../images/like-filled.svg";
import commentsImg from "../../images/comments.svg";

import UserBadge from "../UserBadge/UserBadge";
import Comment from "../Comment/Comment";
import CommentInput from "../CommentInput/CommentInput";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import Like from "../Like/Like";
import "./PostCard.css";

const PostCard = ({ author, likes, comments, imgUrl, id, handleOpenModal }) => {
  const { userData: personalData } = useMyData();
  const dispatch = useDispatch();

  return (
    <div className="post-card">
      <div className="post-card-top">
        <UserBadge userId={author.id} />
      </div>

      <div className="post-card-img-container img-cover-wrapper">
        <img src={imgUrl} alt="" />
      </div>

      <div className="post-card-icons-container">
        <Like
          likes={likes}
          myId={personalData && personalData.id}
          postId={id}
          color="black"
        />

        <ButtonIcon iconImg={commentsImg} onClick={handleOpenModal} />
      </div>

      <div className="post-card-likes-text">уподобали {likes.length} людей</div>

      <CommentList comments={comments} />

      {personalData && (
        <CommentInput nickname={personalData.nickname} postId={id} />
      )}
    </div>
  );
};

const CommentList = ({ comments }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const toggleCommentsOpen = () => setIsCommentsOpen((isOpen) => !isOpen);

  if (comments.length === 0) return <div>Нема коментарів</div>;
  if (comments.length <= 3)
    return (
      <div className="post-card-comments-container">
        {comments.map((comment, i) => (
          <Comment key={i} {...comment} />
        ))}
      </div>
    );

  const filteredComments = isCommentsOpen
    ? comments
    : [comments[0], comments[1], comments[2]];

  return (
    <div className="post-card-comments-container">
      {filteredComments.map((comment, i) => (
        <Comment key={i} {...comment} />
      ))}

      <div onClick={toggleCommentsOpen} className="show-all-text">
        {isCommentsOpen ? "згорнути коментарі" : "Показати усі коментарі..."}
      </div>
    </div>
  );
};

export default PostCard;
