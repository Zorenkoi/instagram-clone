import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { deletePost } from "../../redux/slices/postsSlice";
import { postAnimation } from "../../animations";

import ButtonIcon from "../ButtonIcon/ButtonIcon";
import Like from "../Like/Like";
import ModalConfirm from "../ModalConfirm/ModalConfirm";

import editImg from "../../images/edit-white.svg";
import commentsImg from "../../images/comments-white.svg";
import trashImg from "../../images/trash-white.svg";

import "./MiniPostCard.css";

const MiniPostCard = ({
  i,
  myId,
  postId,
  imgUrl,
  likes,
  comments,
  isYourPost,
  handleOpenModal,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      {...postAnimation(i)}
      className="mini-post-card"
      onClick={handleOpenModal}
    >
      <div className="mini-post-card-img-container">
        <img src={imgUrl} alt="" />
      </div>

      <div className="overlay">
        <div className="overlay-content">
          <IconWithCount count={likes.length}>
            <Like likes={likes} myId={myId} postId={postId} color="white" />
          </IconWithCount>

          <IconWithCount count={comments.length}>
            <ButtonIcon iconImg={commentsImg} onClick={handleOpenModal} />
          </IconWithCount>

          {isYourPost && (
            <ButtonIcon
              iconImg={editImg}
              onClick={() => navigate(`/editpost/${postId}`)}
            />
          )}

          {isYourPost && <DeletePostButton postId={postId} />}
        </div>
      </div>
    </motion.div>
  );
};

const IconWithCount = ({ children, count }) => {
  return (
    <div className="overlay-item">
      {children}
      <div className="overlay-item-count">{count}</div>
    </div>
  );
};

const DeletePostButton = ({ postId }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => dispatch(deletePost({ postId }));
  return (
    <>
      <ModalConfirm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        question="Ви дійсно хочете видалити цей пост?"
        confirm={handleDelete}
      />

      <ButtonIcon iconImg={trashImg} onClick={() => setIsOpen(true)} />
    </>
  );
};

export default MiniPostCard;
