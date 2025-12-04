import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { useDispatch, useSelector } from "react-redux"; // Added useSelector
import { openModal } from "../../redux/slices/modalSlice";
import { motion } from "framer-motion";
import {
  Smartphone,
  Battery,
  Zap,
  Disc,
  Monitor,
  ScanFace,
  PhoneCall,
  Search,
  ShieldCheck,
  Award,
  Wrench,
  Check,
} from "lucide-react";
import styles from "./ModelRepairPage.module.css";

// --- Dummy Data for Repair Services ---
const repairServices = [
  {
    id: 1,
    title: "Display Broken",
    price: 38500,
    originalPrice: 55000,
    discount: "30% OFF",
    icon: <Smartphone size={32} />,
    info: "Glass + Display replacement with genuine parts.",
  },
  {
    id: 2,
    title: "Battery Issue",
    price: 7990,
    originalPrice: null,
    discount: null,
    icon: <Battery size={32} />,
    info: "Battery replacement with 6 months warranty.",
  },
  {
    id: 3,
    title: "Charging Issue",
    price: 7600,
    originalPrice: null,
    discount: null,
    icon: <Zap size={32} />,
    info: "Charging port repair or replacement.",
  },
  {
    id: 4,
    title: "Back Panel Broken",
    price: 7850,
    originalPrice: 15000,
    discount: "48% OFF",
    icon: <Disc size={32} />,
    info: "Laser machine replacement for perfect finish.",
  },
  {
    id: 5,
    title: "Broken Screen Glass",
    price: 12500,
    originalPrice: 20000,
    discount: "38% OFF",
    icon: <Monitor size={32} />,
    info: "Only glass replacement (if display is working).",
  },
  {
    id: 6,
    title: "Diagnosis",
    price: 499,
    originalPrice: null,
    discount: null,
    icon: <Search size={32} />,
    info: "Complete phone checkup to find issues.",
  },
  {
    id: 7,
    title: "Face ID",
    price: 8990,
    originalPrice: null,
    discount: null,
    icon: <ScanFace size={32} />,
    info: "Face ID sensor repair.",
  },
  {
    id: 8,
    title: "Receiver Issue",
    price: 6750,
    originalPrice: null,
    discount: null,
    icon: <PhoneCall size={32} />,
    info: "Earpiece speaker repair.",
  },
];

const ModelRepairPage = () => {
  const { modelName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigation

  // Get Login State
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const toggleService = (service) => {
    const exists = cart.find((item) => item.id === service.id);
    if (exists) {
      setCart(cart.filter((item) => item.id !== service.id));
      setTotal(total - service.price);
    } else {
      setCart([...cart, service]);
      setTotal(total + service.price);
    }
  };

  // --- UPDATED BOOKING LOGIC ---
  const handleBookRepair = () => {
    if (isAuthenticated) {
      // User is logged in -> Go to Checkout
      navigate("/checkout");
    } else {
      // User is NOT logged in -> Open Login Modal
      dispatch(openModal({ type: "login" }));
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.modelHeader}>
            <img
              src="https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro-max.jpg"
              alt={modelName}
              className={styles.modelImage}
            />
            <h1 className={styles.modelTitle}>
              {modelName || "Apple iPhone 16 Pro Max"}
            </h1>
          </div>
        </div>

        <div className={styles.layoutGrid}>
          <div className={styles.leftColumn}>
            <h3 className={styles.sectionTitle}>Pick Your Repair Service</h3>

            <div className={styles.servicesGrid}>
              {repairServices.map((service) => {
                const isAdded = cart.some((item) => item.id === service.id);

                return (
                  <motion.div
                    key={service.id}
                    className={`${styles.serviceCard} ${
                      isAdded ? styles.selected : ""
                    }`}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {service.discount && (
                      <span className={styles.discountBadge}>
                        {service.discount}
                      </span>
                    )}

                    <div className={styles.cardContent}>
                      <div className={styles.iconBox}>{service.icon}</div>
                      <div className={styles.details}>
                        <h4 className={styles.serviceTitle}>{service.title}</h4>
                        <div className={styles.priceRow}>
                          <span className={styles.price}>
                            {formatPrice(service.price)}
                          </span>
                          {service.originalPrice && (
                            <span className={styles.originalPrice}>
                              {formatPrice(service.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      className={`${styles.addBtn} ${
                        isAdded ? styles.addedBtn : ""
                      }`}
                      onClick={() => toggleService(service)}
                    >
                      {isAdded ? (
                        <>
                          <Check size={16} style={{ marginRight: 4 }} /> Added
                        </>
                      ) : (
                        "Add"
                      )}
                    </button>

                    <div className={styles.infoText}>
                      <span className={styles.infoIcon}>ℹ</span> {service.info}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className={styles.bottomInfo}>
              <Wrench size={20} />
              <span>
                Looking for other repair service?{" "}
                <Link to="/contact">
                  Leave a message our team will get in touch with you!
                </Link>
              </span>
            </div>

            <div className={styles.whyChoose}>
              <h3>Why Choose us?</h3>
              <div className={styles.featuresRow}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIconBox}>
                    <Wrench size={24} />
                  </div>
                  <span>Pay after Service</span>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIconBox}>
                    <ShieldCheck size={24} />
                  </div>
                  <span>90 Days Warranty</span>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIconBox}>
                    <Award size={24} />
                  </div>
                  <span>Genuine Parts</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.priceCard}>
              <h3 className={styles.priceTitle}>Price Details</h3>

              {cart.length > 0 && (
                <div className={styles.cartItems}>
                  {cart.map((item) => (
                    <div key={item.id} className={styles.cartRow}>
                      <span>{item.title}</span>
                      <span>{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.couponSection}>
                <span>Apply Coupon</span>
                <button className={styles.applyBtn}>Apply</button>
              </div>

              <div className={styles.billRow}>
                <span>Total Amount</span>
                <span className={styles.totalAmount}>{formatPrice(total)}</span>
              </div>

              <button
                className={styles.bookRepairBtn}
                onClick={handleBookRepair}
                disabled={total === 0}
              >
                Book Repair
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelRepairPage;
