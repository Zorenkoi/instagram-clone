import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserFilter.css";
import { useSelector } from "react-redux";
import { UserBadge2 } from "../UserBadge/UserBadge";
import { AnimatePresence, motion } from "framer-motion";
import { animation1 } from "../../animations";

const UserFilter = () => {
  const { users } = useSelector((data) => data.usersReducer);
  const [query, setQuery] = useState("");

  const [isHintDisplayed, setIsHintDisplayed] = useState(false);

  const focus = () => {
    setIsHintDisplayed(true);
  };
  const unFocus = () => {
    setIsHintDisplayed(false);
  };

  const filteredUsers = filterUsers({ users, query });

  return (
    <div className="filter-container">
      <input
        type="text"
        className="input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={focus}
        onBlur={unFocus}
        placeholder="Пошук користувачів"
      />

      <UsersList users={filteredUsers} isHintDisplayed={isHintDisplayed} />
    </div>
  );
};

const filterUsers = ({ users, query }) => {
  const lowerQuery = query.toLowerCase();

  return users.filter((user) => {
    const nickname = user.nickname.toLowerCase();
    const firstName = user.firstName.toLowerCase();
    const lastName = user.lastName.toLowerCase();

    if (
      nickname.includes(lowerQuery) ||
      firstName.includes(lowerQuery) ||
      lastName.includes(lowerQuery)
    ) {
      return true;
    }
  });
};

const UsersList = ({ users, isHintDisplayed }) => {
  const navigate = useNavigate();
  const [activeHint, setActiveHint] = useState(0);

  useEffect(() => {
    setActiveHint(0);
  }, [users]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          setActiveHint((value) => {
            if (value === 0) return value;
            return value - 1;
          });
          break;

        case "ArrowDown":
          setActiveHint((value) => {
            if (value === users.length - 1) return value;
            return value + 1;
          });
          break;

        case "Enter":
          if (isHintDisplayed) {
            navigate(`/${users[activeHint].id}`);
          }
          break;

        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeHint, users, isHintDisplayed]);

  if (!users) return null;

  return (
    <AnimatePresence>
      {isHintDisplayed && (
        <motion.div {...animation1()} className={`filter-list-container`}>
          {users.map((user, i) => {
            return (
              <Link
                to={`/${user.id}`}
                key={user.id}
                className={`filter-link ${i === activeHint && "active"} `}
              >
                <UserBadge2 {...user} />
              </Link>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserFilter;
