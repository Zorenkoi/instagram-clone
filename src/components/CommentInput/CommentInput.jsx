import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../redux/slices/postsSlice";
import "./CommentInput.css";
import { openModalUsers } from "../../redux/slices/modalUsersSlice";
import uniqid from "uniqid";

const CommentInput = ({ nickname, postId, myId }) => {
  const dispatch = useDispatch();
  const [textComment, setTextComment] = useState("");

  const handleAddComment = () => {
    if (!myId) {
      dispatch(openModalUsers());
      return;
    }
    if (!nickname || textComment === "") {
      return;
    }

    const comment = {
      userId: myId,
      nickname,
      text: textComment,
      id: uniqid(),
    };

    dispatch(addComment({ postId, comment }));
    setTextComment("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    }
  };

  return (
    <div className="comment-input-container">
      <input
        className="input"
        value={textComment}
        onChange={(e) => setTextComment(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button className="button desctop-only" onClick={handleAddComment}>
        коментувати
      </button>
    </div>
  );
};

export default CommentInput;
