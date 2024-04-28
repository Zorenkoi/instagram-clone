import { useState } from "react";
import "./Navbar.css";
import { UserLink } from "../UserBadge/UserBadge";
import Logo from "../Logo/Logo";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMyId } from "../../redux/slices/usersSlice";
import { AnimatePresence, motion } from "framer-motion";
import { animation1 } from "../../animations";
import { openModalUsers } from "../../redux/slices/modalUsersSlice";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar-body">
          <Logo />

          <User />
        </div>
      </div>
    </div>
  );
};

const User = () => {
  const { myId } = useSelector((data) => data.usersReducer);

  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="user-menu-container"
      onMouseEnter={open}
      onMouseLeave={close}
    >
      <UserLink userId={myId} />

      <AnimatePresence>
        {isOpen && (
          <motion.div {...animation1()} className="user-menu-body">
            <ChooseUserButton close={close} />

            <AddUserButton close={close} />

            {myId && <LogOutButton close={close} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ChooseUserButton = () => {
  const dispatch = useDispatch();

  const openModal = () => dispatch(openModalUsers());

  return (
    <button className="small-button" onClick={openModal}>
      Обрати користувача
    </button>
  );
};

const AddUserButton = ({ close }) => {
  const navigate = useNavigate();

  return (
    <button
      className="small-button"
      onClick={() => {
        close();
        navigate("/adduser");
      }}
    >
      Додати користувача
    </button>
  );
};

const LogOutButton = ({ close }) => {
  const dispatch = useDispatch();

  return (
    <button
      className="small-button"
      onClick={() => {
        close();
        dispatch(setMyId({ myId: null }));
      }}
    >
      Вийти
    </button>
  );
};

export default Navbar;
