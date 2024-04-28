import { useDispatch, useSelector } from "react-redux";
import { setMyId } from "../../redux/slices/usersSlice";
import "./ChooseUserList.css";
import { closeModalUsers } from "../../redux/slices/modalUsersSlice";
import { UserBadge2 } from "../UserBadge/UserBadge";
import { CloseButton } from "../ModalPost/ModalPost";
import { motion, AnimatePresence } from "framer-motion";
import { modalWrapperAnimation, modalAnimation } from "../../animations";

const ChooseUserList = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((data) => data.usersReducer);
  const { isOpen } = useSelector((data) => data.modalUsersReducer);

  const closeModal = () => dispatch(closeModalUsers());

  const clickUser = ({ userId }) => {
    dispatch(setMyId({ myId: userId }));
    closeModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...modalWrapperAnimation()}
          className="modal-wrapper"
          onClick={closeModal}
        >
          <motion.div
            {...modalAnimation()}
            className="modal-choose-body"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={closeModal} />

            <div className="modal-choose-header h1">Оберіть користувача</div>

            {users &&
              users.map((user) => {
                return (
                  <div
                    onClick={() => clickUser({ userId: user.id })}
                    key={user.id}
                    className="filter-link"
                  >
                    <UserBadge2 {...user} />
                  </div>
                );
              })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChooseUserList;
