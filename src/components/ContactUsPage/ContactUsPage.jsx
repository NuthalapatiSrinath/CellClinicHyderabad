import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  CheckCircle,
  X,
} from "lucide-react";
import styles from "./ContactUsPage.module.css";

// --- Toast Component (Internal) ---
const Toast = ({ message, onClose }) => {
  return (
    <motion.div
      className={styles.toast}
      initial={{ opacity: 0, y: 50, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: 20, x: "-50%" }}
    >
      <CheckCircle size={20} />
      <span>{message}</span>
      <button onClick={onClose} className={styles.toastClose}>
        <X size={16} />
      </button>
    </motion.div>
  );
};

// --- Main Page Component ---
const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    description: "",
  });
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log("Form Submitted", formData);

    // Show Toast
    setShowToast(true);

    // Hide Toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);

    // Reset Form
    setFormData({ name: "", email: "", mobile: "", description: "" });
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <Toast
            message="Thank you! We will contact you shortly."
            onClose={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Contact Us</h1>
          <p className={styles.breadcrumbs}>Home &gt; Contact Us</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.contentGrid}>
          {/* --- Left Column: Form --- */}
          <motion.div
            className={styles.formSection}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.sectionHeading}>
              WE’D LOVE TO HEAR FROM YOU!
            </h2>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name*"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.row}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile*"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <textarea
                name="description"
                placeholder="Description*"
                required
                rows="5"
                value={formData.description}
                onChange={handleChange}
                className={styles.textarea}
              ></textarea>

              <motion.button
                type="submit"
                className={styles.submitBtn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                SUBMIT
              </motion.button>
            </form>
          </motion.div>

          {/* --- Right Column: Info Cards --- */}
          <motion.div
            className={styles.infoSection}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Card 1: Address */}
            <div className={styles.infoCard}>
              <div className={styles.iconBox}>
                <MapPin size={24} color="white" />
              </div>
              <div className={styles.infoText}>
                <h3>Head Office Address:</h3>
                <p>
                  Your Address, streetnumber, Plot 5 to 8, Sector 5,Main
                  Address, Madhapur, Hyderabad, Telangana 408701
                </p>
              </div>
            </div>

            {/* Card 2: Email */}
            <div className={styles.infoCard}>
              <div className={styles.iconBox}>
                <Mail size={24} color="white" />
              </div>
              <div className={styles.infoText}>
                <h3>Email</h3>
                <a href="mailto:support@cellclinichyd.com">
                  support@cellclinichyderabad.com
                </a>
              </div>
            </div>

            {/* Card 3: Phone */}
            <div className={styles.infoCard}>
              <div className={styles.iconBox}>
                <Phone size={24} color="white" />
              </div>
              <div className={styles.infoText}>
                <h3>Phone Number</h3>
                <a href="tel:+919346532339">+91 9346532339</a>
              </div>
            </div>

            {/* Card 4: WhatsApp */}
            <div className={styles.infoCard}>
              <div className={styles.iconBox}>
                <MessageCircle size={24} color="white" />
              </div>
              <div className={styles.infoText}>
                <h3>Whatsapp Number</h3>
                <a
                  href="https://wa.me/9346532339"
                  target="_blank"
                  rel="noreferrer"
                >
                  +91 9346532339
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
