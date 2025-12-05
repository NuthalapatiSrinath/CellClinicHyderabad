import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import styles from "./BrandsSection.module.css";
import { catalogService } from "../../services/catalogService"; // Import API Service

// --- UI Config (Maps DB names to your specific colors/styles) ---
const BRAND_STYLES = {
  apple: { color: "#000000", style: "apple" },
  xiaomi: { label: "mi", color: "#FF6900", style: "xiaomi" },
  samsung: { color: "#1428A0", style: "sans", nameDisplay: "SAMSUNG" },
  vivo: { color: "#415FFF", style: "lowercase" },
  oneplus: { color: "#F00024", style: "oneplus", nameDisplay: "ONEPLUS" },
  oppo: { color: "#04823F", style: "lowercase-bold" },
  motorola: { color: "#5c5c5c", style: "moto" },
  iqoo: { color: "#FBC02D", style: "bold" },
  poco: { color: "#FFD400", style: "bold" },
  tecno: { color: "#0033A0", style: "sans", nameDisplay: "TECNO" },
  nothing: { color: "#000000", style: "dotted", nameDisplay: "NOTHING" },
  nokia: { color: "#124191", style: "bold", nameDisplay: "NOKIA" },
  honor: { color: "#00E0FF", style: "gradient" },
};

// --- Fallback Data ---
const fallbackBrands = [
  { id: 1, name: "Apple", color: "#000000", style: "apple" },
  { id: 2, name: "xiaomi", label: "mi", color: "#FF6900", style: "xiaomi" },
  { id: 3, name: "SAMSUNG", color: "#1428A0", style: "sans" },
  { id: 4, name: "vivo", color: "#415FFF", style: "lowercase" },
  { id: 5, name: "ONEPLUS", color: "#F00024", style: "oneplus" },
  { id: 6, name: "oppo", color: "#04823F", style: "lowercase-bold" },
  { id: 7, name: "motorola", color: "#5c5c5c", style: "moto" },
  { id: 8, name: "iQOO", color: "#FBC02D", style: "bold" },
  { id: 9, name: "POCO", color: "#FFD400", style: "bold" },
  { id: 10, name: "TECNO", color: "#0033A0", style: "sans" },
  { id: 11, name: "NOTHING", color: "#000000", style: "dotted" },
  { id: 12, name: "NOKIA", color: "#124191", style: "bold" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

const BrandsSection = () => {
  const [brandsList, setBrandsList] = useState(fallbackBrands);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        console.log("🔵 Fetching Brands from API..."); // LOG 1: Start
        const response = await catalogService.getBrands();
        console.log("🟢 API Response:", response); // LOG 2: Raw Response

        if (response && response.data && response.data.length > 0) {
          // Filter only mobile brands
          const mobileBrands = response.data.filter(
            (b) =>
              !["ipad", "macbook", "smartwatch"].includes(b.name.toLowerCase())
          );

          if (mobileBrands.length > 0) {
            const integratedBrands = mobileBrands.map((b) => {
              const config = BRAND_STYLES[b.name.toLowerCase()] || {
                color: "#333",
                style: "sans",
              };
              return {
                id: b._id,
                name: config.nameDisplay || b.name,
                label: config.label,
                color: config.color,
                style: config.style,
                dbName: b.name,
              };
            });

            console.log("✅ Brands Mapped & Ready:", integratedBrands); // LOG 3: Final Data
            setBrandsList(integratedBrands);
          } else {
            console.log("⚠️ API returned data, but no mobile brands found.");
          }
        } else {
          console.log("⚠️ API Response empty or invalid structure.");
        }
      } catch (error) {
        console.error("🔴 Error fetching brands:", error); // LOG 4: Error
      }
    };
    fetchBrands();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          Choose Your Brands
        </motion.h2>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {brandsList.map((brand) => (
            <NavLink
              key={brand.id}
              to={`/repair-brand/${(brand.dbName || brand.name).toLowerCase()}`}
              className={styles.cardLink}
            >
              <motion.div
                className={styles.card}
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                  transition: { duration: 0.2 },
                }}
              >
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

                  {brand.label ? brand.label : brand.name}
                </div>
              </motion.div>
            </NavLink>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsSection;
