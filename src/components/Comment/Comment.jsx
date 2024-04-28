import "./Comment.css";
import useUserData from "../../hooks/useUserData";

const Comment = ({ userId, text, id }) => {
  const { userData } = useUserData({ userId });

  const avatarUrl = userData?.avatarUrl;
  const nickname = userData?.nickname;

  if (!id) return;

  return (
    <div className="comment">
      <div className="user-circle">
        {avatarUrl && <img src={avatarUrl} alt="" className="avatar-img" />}
      </div>

      <div className="medium-text">
        {nickname && <b>{nickname}: </b>}
        {text}
      </div>
    </div>
  );
};

export default Comment;
