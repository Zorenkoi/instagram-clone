import { motion, AnimatePresence } from "framer-motion";
import { modalWrapperAnimation, modalAnimation } from "../../animations";
import "./ModalConfirm.css";
import { useDispatch, useSelector } from "react-redux";
import { closeModalConfirm } from "../../redux/slices/modalConfirmSlice";

const ModalConfirm = () => {
  const dispatch = useDispatch();
  const { cancel, confirm, isOpen, question } = useSelector(
    (state) => state.modalConfirmReducer
  );
  const closeModal = () => dispatch(closeModalConfirm());

  const handleClose = (e) => {
    closeModal();
  };

  const handleConfirm = (e) => {
    e.stopPropagation();
    if (confirm) confirm();
    closeModal();
  };
  const handleCancel = (e) => {
    e.stopPropagation();
    if (cancel) cancel();
    closeModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...modalWrapperAnimation()}
          className="modal-wrapper"
          onClick={handleClose}
        >
          <motion.div
            {...modalAnimation()}
            className="modal-confirm-body"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-confirm-question">{question}</div>

            <div className="modal-confirm-button-container">
              <button className="button" onClick={handleConfirm}>
                Підтвердити
              </button>
              <button className="button" onClick={handleCancel}>
                Відмінити
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalConfirm;
