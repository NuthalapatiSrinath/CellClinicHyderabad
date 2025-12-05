import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeModal } from "../../redux/slices/modalSlice";
import { X, PhoneCall, Loader2 } from "lucide-react";
import styles from "./BookingModal.module.css";

// --- IMPORT SERVICE ---
import { inquiryService } from "../../services/inquiryService";

const BookingModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.modal);

  const [formData, setFormData] = useState({ name: "", mobile: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    // Prepare Data
    const payload = {
      name: formData.name,
      mobileNumber: formData.mobile,
      deviceModel: data?.deviceModel || "Unknown Device",
      // Map to match backend schema
      selectedServices:
        data?.selectedServices?.map((s) => ({
          name: s.title,
          price: s.price,
        })) || [],
      totalEstimatedPrice: data?.total || 0,
    };

    try {
      // --- USE SERVICE HERE ---
      const response = await inquiryService.createInquiry(payload);

      if (response.success) {
        setStatus("success");
        setTimeout(() => {
          dispatch(closeModal());
          navigate("/booking-success");
        }, 1000);
      } else {
        alert("Something went wrong");
        setStatus("idle");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Failed to connect to server");
      setStatus("idle");
    }
  };

  // ... rest of your JSX remains exactly the same ...
  return (
    <div className={styles.modalContainer}>{/* ... existing code ... */}</div>
  );
};

export default BookingModal;
