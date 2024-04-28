import { useState, useEffect } from "react";
import "./ModalPost.css";
import { useDispatch, useSelector } from "react-redux";
import usePost from "../../hooks/usePost";
import { closeModal, nextPost, prevPost } from "../../redux/slices/modalSlice";
import Comment from "../Comment/Comment";
import Like from "../Like/Like";
import UserBadge from "../UserBadge/UserBadge";
import CommentInput from "../CommentInput/CommentInput";
import useMyData from "../../hooks/useMyData";
import { AnimatePresence, motion } from "framer-motion";

import rightImg from "../../images/right.svg";
import leftImg from "../../images/left.svg";
import closeImg from "../../images/close.svg";

const ModalPost = () => {
  const dispatch = useDispatch();
  const { isOpen, postId, isLast, isFirst } = useSelector(
    (data) => data.modalReducer
  );

  const { userData: personalData, myId } = useMyData();

  const { post, updatePost } = usePost({ postId });
  useEffect(() => {
    updatePost({ postId });
  }, [postId]);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  if (!post) return null;

  const { comments, likes, imgUrl, author, text, dateString } = post;

  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };
  const variants2 = {
    initial: {
      opacity: 0,
      y: 500,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -500,
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={"hidden"}
          animate={"visible"}
          exit={"hidden"}
          variants={variants}
          className="modal-wrapper"
          onClick={handleCloseModal}
        >
          <motion.div
            key={post.id}
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
            variants={variants2}
            className="modal-post-body "
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={handleCloseModal} />
            <ModalControl isFirst={isFirst} isLast={isLast} />

            <div className="modal-post-img-container">
              <img src={imgUrl} alt="" />
            </div>

            <div className="modal-post-info">
              <div className="modal-post-info-top">
                <UserBadge
                  userId={author.id}
                  functionBefore={() => dispatch(closeModal())}
                />

                <div className="data-text">
                  {formatDate(new Date(dateString))}
                </div>
                {text && <div className="text">{text}</div>}
              </div>

              <div>
                <Like myId={myId} likes={likes} postId={postId} color="black" />
                <div className="small-text">
                  уподобали <b>{likes.length}</b> людей
                </div>
              </div>

              <div className="modal-post-comments-list">
                {comments.length === 0 && (
                  <div className="medium-text">Комментарів покищо нема...</div>
                )}

                {comments.map((comment) => (
                  <Comment key={comment.id} {...comment} />
                ))}
              </div>

              <CommentInput
                nickname={personalData?.nickname}
                myId={myId}
                postId={postId}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ModalControl = ({ isFirst, isLast }) => {
  const dispatch = useDispatch();

  return (
    <div className="circle-button-container">
      <button
        disabled={isFirst}
        className="circle-button"
        onClick={() => dispatch(prevPost())}
      >
        <img src={leftImg} alt="" />
      </button>

      <button
        disabled={isLast}
        className="circle-button"
        onClick={() => dispatch(nextPost())}
      >
        <img src={rightImg} alt="" />
      </button>
    </div>
  );
};

export const CloseButton = ({ onClick }) => {
  return (
    <button className="circle-button close-button" onClick={onClick}>
      <img src={closeImg} alt="" />
    </button>
  );
};

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const AnimateModalPost = () => {
  return (
    <AnimatePresence mode="wait">
      <ModalPost />
    </AnimatePresence>
  );
};

export default AnimateModalPost;
