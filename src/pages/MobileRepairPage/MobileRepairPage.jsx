import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import styles from "./MobileRepairPage.module.css";
import BestInClassSection from "../../components/BestInClassSection/BestInClassSection";

// --- Brands Data ---
const brands = [
  { id: 1, name: "Apple", color: "#000000", style: "apple" },
  { id: 2, name: "Xiaomi", label: "mi", color: "#FF6900", style: "xiaomi" },
  { id: 3, name: "Samsung", color: "#1428A0", style: "sans" },
  { id: 4, name: "Vivo", color: "#415FFF", style: "lowercase" },
  { id: 5, name: "OnePlus", color: "#F00024", style: "oneplus" },
  { id: 6, name: "Oppo", color: "#04823F", style: "lowercase-bold" },
  { id: 7, name: "Google", color: "#4285F4", style: "google" },
  { id: 8, name: "Realme", color: "#FFC915", style: "bold" },
  { id: 9, name: "Motorola", color: "#5c5c5c", style: "moto" },
  {
    id: 10,
    name: "iPad",
    img: "/images/services/ipad.webp",
    style: "image",
  },
  {
    id: 11,
    name: "iWatch",
    img: "/images/services/smartwatch.webp",
    style: "image",
  },
  {
    id: 12,
    name: "MacBook",
    img: "/images/services/macbook.webp",
    style: "image",
  },
  { id: 13, name: "iQOO", color: "#FBC02D", style: "bold" },
  { id: 14, name: "POCO", color: "#FFD400", style: "bold" },
  { id: 15, name: "Tecno", color: "#0033A0", style: "sans" },
  { id: 16, name: "Nothing", color: "#000000", style: "dotted" },
  { id: 17, name: "Nokia", color: "#124191", style: "bold" },
  { id: 18, name: "Honor", color: "#00E0FF", style: "gradient" },
];

// --- Animation Variants (Simplified for speed) ---
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } }, // Faster duration
};

const MobileRepairPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter logic
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
        <div className={styles.grid}>
          {filteredBrands.map((brand) => (
            <Link
              to={`/repair-brand/${brand.name.toLowerCase()}`}
              key={brand.id} // Using ID ensures React tracks items correctly
              className={styles.cardLink}
            >
              <motion.div
                className={styles.card}
                layout // This prop enables smooth shuffling when list changes
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover={{ y: -5, borderColor: "var(--Primary_Color)" }}
              >
                <div className={styles.logoArea}>
                  {brand.style === "image" ? (
                    <img
                      src={brand.img}
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

          {/* Show message if no brands match */}
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
        </div>

        {/* --- Content Section 2 (Why Us) --- */}
        <div className={styles.whyUsWrapper}>
          <BestInClassSection />
        </div>
      </div>
    </div>
  );
};

export default MobileRepairPage;
