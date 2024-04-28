import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTwoUsers } from "../../redux/slices/usersSlice";

import useMyData from "../../hooks/useMyData";

import "./UserBioButtons.css";

const UserBioButtons = ({ userId, userData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData: personalData, myId } = useMyData();

  if (!personalData || !userData || !myId) return null;

  const handleEditProfile = () => {
    navigate("/editprofile");
  };
  const handleAddPost = () => {
    navigate("/addpost");
  };
  const handleSubscribe = () => {
    const updatedPersonalData = {
      ...personalData,
      subscribed: [...personalData.subscribed, userId],
    };

    const updatedUserData = {
      ...userData,
      subscribers: [...userData.subscribers, myId],
    };

    dispatch(
      updateTwoUsers({
        updatedUser1: updatedPersonalData,
        updatedUser2: updatedUserData,
      })
    );
  };
  const handleUnsubscribe = () => {
    const updatedPersonalData = {
      ...personalData,
      subscribed: personalData.subscribed.filter((id) => String(id) !== userId),
    };
    const updatedUserData = {
      ...userData,
      subscribers: userData.subscribers.filter(
        (id) => String(id) !== String(myId)
      ),
    };

    dispatch(
      updateTwoUsers({
        updatedUser1: updatedPersonalData,
        updatedUser2: updatedUserData,
      })
    );
  };

  if (String(myId) === String(userId))
    return (
      <div className="buttons-container">
        <button className="button" onClick={handleEditProfile}>
          Редагувати
        </button>

        <button className="button" onClick={handleAddPost}>
          Додати пост
        </button>
      </div>
    );

  if (userData.subscribers.find((id) => String(id) === String(myId))) {
    return (
      <button className="button" onClick={handleUnsubscribe}>
        Відписатися
      </button>
    );
  }

  if (!userData.subscribers.find((id) => String(id) === String(myId))) {
    return (
      <button className="button" onClick={handleSubscribe}>
        Підписатися
      </button>
    );
  }
};

export default UserBioButtons;
