import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom"; // Changed to NavLink
import styles from "./BrandsSection.module.css";

const brands = [
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

// --- Animation Variants ---
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
          {brands.map((brand) => (
            /* Using NavLink ensures proper navigation handling */
            <NavLink
              key={brand.id}
              to={`/repair-brand/${brand.name.toLowerCase()}`}
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
