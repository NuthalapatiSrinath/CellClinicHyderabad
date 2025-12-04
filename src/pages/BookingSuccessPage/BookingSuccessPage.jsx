import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import styles from "./BookingSuccessPage.module.css";

const BookingSuccessPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <motion.div
          className={styles.successCard}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <div className={styles.iconWrapper}>
            <CheckCircle size={80} className={styles.successIcon} />
          </div>

          <h1 className={styles.title}>Booking Confirmed!</h1>
          <p className={styles.subText}>
            Thank you for choosing Cell Clinic Hyderabad. Your repair request
            has been successfully placed.
          </p>

          <div className={styles.orderDetails}>
            <div className={styles.row}>
              <span>Order ID:</span>
              <strong>#CCH-89023</strong>
            </div>
            <div className={styles.row}>
              <span>Estimated Time:</span>
              <strong>Tomorrow, 10:00 AM - 12:00 PM</strong>
            </div>
          </div>

          <div className={styles.actions}>
            <Link to="/orders" className={styles.trackBtn}>
              <Package size={18} /> Track Order
            </Link>
            <Link to="/" className={styles.homeBtn}>
              Go Home <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
