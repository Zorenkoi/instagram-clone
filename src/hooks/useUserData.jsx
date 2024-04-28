import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useUserData = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const { users } = useSelector((data) => data.usersReducer);

  const updateUserData = ({ userId }) => {
    if (users || userId) {
      const user = users.find((user) => String(user.id) === String(userId));

      setUserData(user);
    }
  };

  useEffect(() => {
    updateUserData({ userId });
  }, [users]);

  return {
    userData,
    updateUserData,
  };
};

export default useUserData;
