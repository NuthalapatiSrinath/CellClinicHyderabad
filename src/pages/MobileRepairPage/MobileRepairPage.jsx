import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import styles from "./MobileRepairPage.module.css";
import BestInClassSection from "../../components/BestInClassSection/BestInClassSection";
import { catalogService } from "../../services/catalogService"; // Import API Service

// --- UI Configuration (Maps API Data to Visual Styles) ---
const BRAND_CONFIG = {
  apple: { color: "#000000", style: "apple" },
  xiaomi: { label: "mi", color: "#FF6900", style: "xiaomi" },
  samsung: { color: "#1428A0", style: "sans" },
  vivo: { color: "#415FFF", style: "lowercase" },
  oneplus: { color: "#F00024", style: "oneplus" },
  oppo: { color: "#04823F", style: "lowercase-bold" },
  google: { color: "#4285F4", style: "google" },
  realme: { color: "#FFC915", style: "bold" },
  motorola: { color: "#5c5c5c", style: "moto" },
  // Non-phone categories (styled as images)
  ipad: { style: "image", img: "/images/services/ipad.webp" },
  iwatch: { style: "image", img: "/images/services/smartwatch.webp" }, // Matches 'smartwatch' from DB
  smartwatch: { style: "image", img: "/images/services/smartwatch.webp" },
  macbook: { style: "image", img: "/images/services/macbook.webp" },
  iqoo: { color: "#FBC02D", style: "bold" },
  poco: { color: "#FFD400", style: "bold" },
  tecno: { color: "#0033A0", style: "sans" },
  nothing: { color: "#000000", style: "dotted" },
  nokia: { color: "#124191", style: "bold" },
  honor: { color: "#00E0FF", style: "gradient" },
};

// --- Fallback Data (Shows if API fails or loads) ---
const fallbackBrands = [
  { id: 1, name: "Apple", color: "#000000", style: "apple" },
  { id: 2, name: "Xiaomi", label: "mi", color: "#FF6900", style: "xiaomi" },
  { id: 3, name: "Samsung", color: "#1428A0", style: "sans" },
  { id: 10, name: "iPad", img: "/images/services/ipad.webp", style: "image" },
];

// --- Animations ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
};

const MobileRepairPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState(fallbackBrands); // Default to fallback initially

  useEffect(() => {
    window.scrollTo(0, 0);

    // --- Fetch Brands from Backend ---
    const fetchBrands = async () => {
      try {
        const response = await catalogService.getBrands();
        if (response && response.data && response.data.length > 0) {
          const integratedBrands = response.data.map((b) => {
            const key = b.name.toLowerCase().replace(/\s+/g, ""); // normalize key (e.g. "Apple Watch" -> "applewatch")

            // Check for direct match or partial match in config
            let config =
              BRAND_CONFIG[key] || BRAND_CONFIG[b.name.toLowerCase()];

            // Default style if not found in config
            if (!config) config = { color: "#333", style: "sans" };

            return {
              id: b._id,
              name: b.name,
              ...config, // Merges color, style, img, label
            };
          });

          setBrands(integratedBrands);
        }
      } catch (error) {
        console.error("Failed to load brands from API", error);
        // Keep fallback brands if API fails
      }
    };

    fetchBrands();
  }, []);

  // --- Filter Logic ---
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* --- Header --- */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.pageTitle}>Repair Your Mobile Phone</h1>
            <p className={styles.breadcrumbs}>Home &gt; Repair &gt;</p>
          </div>

          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Select Model"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <h3 className={styles.sectionTitle}>Select Brand</h3>

        {/* --- Brands Grid --- */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredBrands.map((brand) => (
            <Link
              to={`/repair-brand/${brand.name.toLowerCase()}`}
              key={brand.id}
              className={styles.cardLink}
            >
              <motion.div
                className={styles.card}
                variants={cardVariants}
                whileHover={{ y: -5, borderColor: "var(--Primary_Color)" }}
              >
                {/* Render Brand Logo/Text Based on Style */}
                <div className={styles.logoArea}>
                  {brand.style === "image" ? (
                    <img
                      src={brand.img} // Uses image from config (e.g. /images/services/ipad.webp)
                      alt={brand.name}
                      className={styles.brandImage}
                    />
                  ) : (
                    <div
                      className={`${styles.brandText} ${styles[brand.style]}`}
                      style={{ color: brand.color }}
                    >
                      {brand.style === "moto" && (
                        <span className={styles.motoM}>M</span>
                      )}
                      {brand.style === "oneplus" && (
                        <span className={styles.onePlusBox}>1+</span>
                      )}
                      {brand.style === "google" && (
                        <span className={styles.googleG}>G</span>
                      )}

                      {brand.label ? brand.label : brand.name}
                    </div>
                  )}
                </div>
                <p className={styles.brandName}>{brand.name}</p>
              </motion.div>
            </Link>
          ))}

          {/* Empty State */}
          {filteredBrands.length === 0 && (
            <p
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                color: "#666",
              }}
            >
              No brands found matching "{searchTerm}"
            </p>
          )}
        </motion.div>

        {/* --- Content Section (Integrated) --- */}
        <div className={styles.whyUsWrapper}>
          <BestInClassSection />
        </div>
      </div>
    </div>
  );
};

export default MobileRepairPage;
