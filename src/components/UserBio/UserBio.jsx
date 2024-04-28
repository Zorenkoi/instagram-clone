import "./UserBio.css";
import AvatarCircle from "../AvatarCircle/AvatarCircle";

const UserBio = ({
  avatarUrl,
  description,
  firstName,
  lastName,
  nickname,
  subscribed,
  subscribers,
  url,
  children,
}) => {
  return (
    <div className="userbio">
      <AvatarCircle avatarUrl={avatarUrl} nickname={nickname} />

      <div className="userbio-info">
        <div className="h2">{nickname}</div>

        <div className="userbio-row">
          <div className="text">{firstName}</div>
          <div className="text">{lastName}</div>
        </div>

        <div className="userbio-row">
          <CountWithText count={subscribed.length}>Подписок</CountWithText>
          <CountWithText count={subscribers.length}>Подписчиков</CountWithText>
        </div>

        <a className="link" href={url}>
          {url}
        </a>

        <div className="medium-text">{description}</div>

        {children}
      </div>
    </div>
  );
};

const CountWithText = ({ count, children }) => {
  return (
    <div className="userbio-count small-text">
      <b>{count}</b>
      <div>{children}</div>
    </div>
  );
};

export default UserBio;
