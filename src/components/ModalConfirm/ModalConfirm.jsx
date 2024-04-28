import { motion, AnimatePresence } from "framer-motion";
import { modalWrapperAnimation, modalAnimation } from "../../animations";
import "./ModalConfirm.css";

const ModalConfirm = ({
  isOpen,
  setIsOpen,
  question,
  confirm,
  cancel = () => {},
}) => {
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleClose = (e) => {
    e.stopPropagation();
    closeModal();
  };

  const handleConfirm = (e) => {
    e.stopPropagation();
    confirm();
    closeModal();
  };
  const handleCancel = (e) => {
    e.stopPropagation();
    cancel();
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
