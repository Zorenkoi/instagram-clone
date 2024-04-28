import React from "react";

import { useDispatch } from "react-redux";
import { toggleLike } from "../../redux/slices/postsSlice";

import likeImgBlack from "../../images/like.svg";
import likeFilledImgBlack from "../../images/like-filled.svg";
import likeImgWhite from "../../images/heart-white.svg";
import likeFilledImgWhite from "../../images/heart-white2.svg";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { openModalUsers } from "../../redux/slices/modalUsersSlice";

const Like = ({ likes, myId, postId, color = "black", clickable = true }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    if (!clickable) return;

    if (!myId) {
      dispatch(openModalUsers());
      return;
    }

    dispatch(toggleLike({ userId: myId, postId }));
  };

  const isLikedByYou = likes.find((id) => myId === id);

  if (color === "black") {
    return (
      <>
        {isLikedByYou ? (
          <ButtonIcon onClick={handleLike} iconImg={likeFilledImgBlack} />
        ) : (
          <ButtonIcon onClick={handleLike} iconImg={likeImgBlack} />
        )}
      </>
    );
  }

  return (
    <>
      {isLikedByYou ? (
        <ButtonIcon onClick={handleLike} iconImg={likeFilledImgWhite} />
      ) : (
        <ButtonIcon onClick={handleLike} iconImg={likeImgWhite} />
      )}
    </>
  );
};

export default Like;
