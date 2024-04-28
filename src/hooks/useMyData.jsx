import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useMyData = () => {
  const [userData, setUserData] = useState(null);
  const { users, myId } = useSelector((data) => data.usersReducer);

  useEffect(() => {
    if (users) {
      const user = users.find((user) => String(user.id) === String(myId));
      if (user) setUserData(user);
      else {
        setUserData(null);
      }
    }
  }, [users, myId]);

  return {
    userData,
    myId,
  };
};

export default useMyData;
