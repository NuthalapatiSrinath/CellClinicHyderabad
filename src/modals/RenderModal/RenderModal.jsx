import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./RenderModal.module.css";
import MainModal from "../MainModal/MainModal";

// Import your new modal
import LoginModal from "../LoginModal/LoginModal";
import FindModelModal from "../FindModelModal/FindModelModal";
import BookingModal from "../BookingModal/BookingModal";

function RenderModal() {
  const activeModal = useSelector((state) => state.modal.type);

  // Register the modal here
  const allModals = {
    login: <LoginModal />,
    findModel: <FindModelModal />,
    booking: <BookingModal />,
  };

  return (
    <MainModal>
      <AnimatePresence mode="wait">
        {activeModal && (
          <motion.div
            key={activeModal}
            className={styles.RenderModal}
            // Adjusted animation for a centered pop-up feel
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {allModals[activeModal]}
          </motion.div>
        )}
      </AnimatePresence>
    </MainModal>
  );
}

export default RenderModal;
