import "./AvatarCircle.css";

const AvatarCircle = ({ avatarUrl, nickname }) => {
  return (
    <div className="avatar-circle">
      <img src={avatarUrl} alt="" />
    </div>
  );
};

export default AvatarCircle;
