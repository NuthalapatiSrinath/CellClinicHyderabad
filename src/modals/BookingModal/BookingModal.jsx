import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeModal } from "../../redux/slices/modalSlice";
import { X, PhoneCall, Loader2, Smartphone } from "lucide-react";
import styles from "./BookingModal.module.css";
import { inquiryService } from "../../services/inquiryService";

const BookingModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.modal);

  const [formData, setFormData] = useState({ name: "", mobile: "" });
  const [status, setStatus] = useState("idle");

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    // --- STRICT PAYLOAD CONSTRUCTION ---
    const payload = {
      name: formData.name,
      mobileNumber: formData.mobile,
      deviceModel: data?.deviceModel || "Unknown Device",

      // MAPPING: Frontend 'title' -> Backend 'name'
      selectedServices:
        data?.selectedServices?.map((s) => ({
          name: s.title,
          price: s.price,
        })) || [],

      totalEstimatedPrice: data?.total || 0,
    };

    console.log(
      "🚀 Payload Sending to Backend:",
      JSON.stringify(payload, null, 2)
    );

    try {
      const response = await inquiryService.createInquiry(payload);

      if (response.success) {
        setStatus("success");
        setTimeout(() => {
          dispatch(closeModal());
          navigate("/booking-success");
        }, 1500);
      } else {
        alert("Something went wrong. Please try again.");
        setStatus("idle");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Server error. Please check your connection.");
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>🎉</div>
          <h3>Booking Confirmed!</h3>
          <p>Redirecting you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay} onClick={() => dispatch(closeModal())}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeBtn}
          onClick={() => dispatch(closeModal())}
        >
          <X size={24} />
        </button>

        <div className={styles.header}>
          <h2>Confirm Repair Booking</h2>
          <p>Fill in your details to get a call back.</p>
        </div>

        <div className={styles.body}>
          {/* Summary Section */}
          <div className={styles.summaryCard}>
            <div className={styles.deviceRow}>
              <Smartphone size={20} className={styles.iconBlue} />
              <span className={styles.deviceName}>{data?.deviceModel}</span>
            </div>

            <div className={styles.divider}></div>

            <ul className={styles.serviceList}>
              {data?.selectedServices?.map((s, idx) => (
                <li key={idx}>
                  <span>{s.title}</span>
                  <span className={styles.servicePrice}>
                    {formatPrice(s.price)}
                  </span>
                </li>
              ))}
            </ul>

            <div className={styles.divider}></div>

            <div className={styles.totalRow}>
              <span>Total Estimate</span>
              <span className={styles.totalPrice}>
                {formatPrice(data?.total || 0)}
              </span>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                placeholder="9876543210"
                maxLength="10"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <Loader2 className={styles.spin} />
              ) : (
                <>
                  <PhoneCall size={18} /> Book Now
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
