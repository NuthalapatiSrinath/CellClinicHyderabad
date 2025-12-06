import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
// Removed toggleTheme import
import { openModal } from "../../redux/slices/modalSlice";
import { MapPin, Mail, CalendarDays, Menu, X } from "lucide-react"; // Removed Sun, Moon
import styles from "./TopBar.module.css";

const TopBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // Removed theme selector

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Helper to check active state
  const isActive = (path) => location.pathname === path;

  // --- NEW HANDLER FOR QUICK BOOKING ---
  const handleQuickBooking = () => {
    dispatch(openModal({ type: "QUICK_BOOKING" }));
  };

  return (
    <>
      {/* --- Top Strip --- */}
      <div className={styles.topStrip}>
        <div className={styles.container}>
          <div className={styles.stripContent}>
            <div className={styles.locationPill}>
              <MapPin size={14} className={styles.icon} />
              <span>Bengaluru | Hyderabad | Mumbai</span>
            </div>

            <div className={styles.rightStripGroup}>
              <div className={styles.emailGroup}>
                <a
                  href="mailto:info@cellclinichyd.com"
                  className={styles.contactLink}
                >
                  <Mail size={14} />
                  <span>info@cellclinichyd.com</span>
                </a>
              </div>

              {/* --- UPDATED BUTTON --- */}
              <button
                className={styles.bookNowBtnSmall}
                onClick={handleQuickBooking}
              >
                <CalendarDays size={14} />
                <span>Book Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Navigation Bar --- */}
      <div
        className={`${styles.mainNav} ${isScrolled ? styles.stickyShadow : ""}`}
      >
        <div className={styles.container}>
          <div className={styles.navContent}>
            {/* Logo */}
            <Link to="/" className={styles.logoGroup}>
              <img
                src="/logo.webp"
                alt="Cell Clinic Logo"
                className={styles.logoImage}
              />
              <span className={styles.brandName}>CELL CLINIC HYD</span>
            </Link>

            {/* Desktop Links */}
            <nav className={styles.navLinks}>
              <Link to="/" className={isActive("/") ? styles.linkActive : ""}>
                Home
              </Link>
              <Link
                to="/about"
                className={isActive("/about") ? styles.linkActive : ""}
              >
                About
              </Link>
              <Link
                to="/services"
                className={isActive("/services") ? styles.linkActive : ""}
              >
                Services
              </Link>
              <Link
                to="/privacy-policy"
                className={isActive("/privacy-policy") ? styles.linkActive : ""}
              >
                Privacy Policy
              </Link>
              <Link
                to="/contact"
                className={isActive("/contact") ? styles.linkActive : ""}
              >
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className={styles.actions}>
              {/* REMOVED THEME TOGGLE BUTTON HERE */}

              {/* Mobile Toggle */}
              <button
                className={styles.mobileMenuBtn}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* --- Mobile Menu --- */}
        <div
          className={`${styles.mobileMenuContainer} ${
            isMenuOpen ? styles.menuOpen : ""
          }`}
        >
          <div className={styles.mobileLinks}>
            <Link
              to="/"
              onClick={handleLinkClick}
              className={isActive("/") ? styles.linkActive : ""}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={handleLinkClick}
              className={isActive("/about") ? styles.linkActive : ""}
            >
              About
            </Link>
            <Link
              to="/services"
              onClick={handleLinkClick}
              className={isActive("/services") ? styles.linkActive : ""}
            >
              Services
            </Link>
            <Link
              to="/privacy-policy"
              onClick={handleLinkClick}
              className={isActive("/privacy-policy") ? styles.linkActive : ""}
            >
              Privacy Policy
            </Link>
            <Link
              to="/contact"
              onClick={handleLinkClick}
              className={isActive("/contact") ? styles.linkActive : ""}
            >
              Contact
            </Link>

            <div className={styles.mobileBtnWrapper}>
              <button
                className={styles.contactBtnMobile}
                onClick={() => {
                  handleLinkClick();
                  handleQuickBooking();
                }}
              >
                Book a Repair
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
