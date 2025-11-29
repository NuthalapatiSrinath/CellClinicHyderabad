import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/slices/themeSlice";
import { MapPin, Mail, CalendarDays, Sun, Moon, Menu, X } from "lucide-react";
import styles from "./TopBar.module.css";

const TopBar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
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
                <a href="mailto:info@craxxo.com" className={styles.contactLink}>
                  <Mail size={14} />
                  <span>info@craxxo.com</span>
                </a>
                <a
                  href="mailto:craxxo888@gmail.com"
                  className={`${styles.contactLink} ${styles.hideOnMobile}`}
                >
                  <Mail size={14} />
                  <span>craxxo888@gmail.com</span>
                </a>
              </div>

              <button className={styles.bookNowBtnSmall}>
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
            <Link to="/" className={styles.logoGroup} onClick={handleLinkClick}>
              {/* UPDATED: Image Logo instead of Text Box */}
              <img
                src="/logo.webp"
                alt="Cell Clinic Logo"
                className={styles.logoImage}
              />
              <span className={styles.brandName}>CELL CLINIC HYD</span>
            </Link>

            <nav className={styles.navLinks}>
              <Link to="/" className={styles.linkActive}>
                Home
              </Link>
              <Link to="/about">About</Link>
              <Link to="/quote">Get Quote</Link>
              <Link to="/reviews">Reviews</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/spotlight">Spotlight</Link>
            </nav>

            <div className={styles.actions}>
              <Link to="/contact" className={styles.contactBtnMain}>
                Contact Us
              </Link>

              <button
                onClick={() => dispatch(toggleTheme())}
                className={styles.themeToggle}
                aria-label="Toggle Theme"
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              <button
                className={styles.mobileMenuBtn}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`${styles.mobileMenuContainer} ${
            isMenuOpen ? styles.menuOpen : ""
          }`}
        >
          <div className={styles.mobileLinks}>
            <Link to="/" onClick={handleLinkClick}>
              Home
            </Link>
            <Link to="/about" onClick={handleLinkClick}>
              About
            </Link>
            <Link to="/quote" onClick={handleLinkClick}>
              Get Quote
            </Link>
            <Link to="/reviews" onClick={handleLinkClick}>
              Reviews
            </Link>
            <Link to="/contact" onClick={handleLinkClick}>
              Contact
            </Link>
            <Link to="/spotlight" onClick={handleLinkClick}>
              Spotlight
            </Link>

            <div className={styles.mobileBtnWrapper}>
              <Link
                to="/contact"
                className={styles.contactBtnMobile}
                onClick={handleLinkClick}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
