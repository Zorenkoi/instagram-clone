import { useEffect } from "react";

import "./UserBadge.css";
import { Link, useNavigate } from "react-router-dom";
import useUserData from "../../hooks/useUserData";
import userImg from "../../images/user.svg";

const UserBadge = ({ userId, functionBefore = () => {} }) => {
  const { userData, updateUserData } = useUserData({ userId });
  const navigate = useNavigate();

  useEffect(() => {
    updateUserData({ userId });
  }, [userId]);

  const clickBadge = () => {
    functionBefore();
    navigate(`/${userId}`);
  };

  if (!userData) return null;

  return (
    <div onClick={clickBadge}>
      <UserBadge2 {...userData} />
    </div>
  );
};

export const UserButton = ({ userId, onClick }) => {
  const { userData, updateUserData } = useUserData({ userId });

  useEffect(() => {
    updateUserData({ userId });
  }, [userId]);

  if (!userData) {
    return (
      <div className="user-circle">
        <img src={userImg} alt="user image" className="user-img" />
      </div>
    );
  }

  return (
    <div onClick={onClick}>
      <UserBadge2 {...userData} />
    </div>
  );
};

export const UserLink = ({ userId }) => {
  const { userData, updateUserData } = useUserData({ userId });

  useEffect(() => {
    updateUserData({ userId });
  }, [userId]);

  if (!userData) {
    return (
      <div className="user-circle">
        <img src={userImg} alt="user image" className="icon-img" />
      </div>
    );
  }

  return (
    <Link to={`/${userId}`}>
      <UserBadge2 {...userData} />
    </Link>
  );
};

export const UserBadge2 = ({ avatarUrl, nickname, firstName, lastName }) => {
  return (
    <div className="user-badge">
      <div className="user-circle">
        {avatarUrl && (
          <img src={avatarUrl} alt="user image" className="avatar-img" />
        )}
      </div>
      <div className="user-info">
        <div className="text">{nickname}</div>
        <div className="medium-text">
          {firstName} {lastName}
        </div>
      </div>
    </div>
  );
};

export default UserBadge;
