import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import styles from "./MobileRepairPage.module.css";
import BestInClassSection from "../../components/BestInClassSection/BestInClassSection";
import { catalogService } from "../../services/catalogService";
import { getImageUrl } from "../../utils/imageHelper"; // Import Helper

// --- UI Configuration (Fallback styles if API has no image) ---
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
  nothing: { color: "#000000", style: "dotted" },
  nokia: { color: "#124191", style: "bold" },
  honor: { color: "#00E0FF", style: "gradient" },
};

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
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchBrands = async () => {
      console.log("🔵 [MobileRepairPage] Fetching brands...");
      try {
        const response = await catalogService.getBrands();
        console.log("🟢 [MobileRepairPage] API Response:", response);

        if (response && response.data && response.data.length > 0) {
          const integratedBrands = response.data.map((b) => {
            // Normalize name for config lookup
            const key = b.name.toLowerCase().replace(/\s+/g, "");
            const config =
              BRAND_CONFIG[key] || BRAND_CONFIG[b.name.toLowerCase()] || {};

            return {
              id: b._id,
              name: b.name,
              // PRIORITIZE API IMAGE, fallback to config image, fallback to null
              image: b.image || config.img || null,
              color: config.color || "#333",
              style: config.style || "sans",
              label: config.label,
            };
          });
          setBrands(integratedBrands);
        }
      } catch (error) {
        console.error("🔴 [MobileRepairPage] Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.pageTitle}>Repair Your Mobile Phone</h1>
            <p className={styles.breadcrumbs}>Home &gt; Repair &gt;</p>
          </div>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Select Brand"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <h3 className={styles.sectionTitle}>Select Brand</h3>

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
                <div className={styles.logoArea}>
                  {/* LOGIC: If API has image, show it. Otherwise show Text/Logo Style */}
                  {brand.image ? (
                    <img
                      src={getImageUrl(brand.image)}
                      alt={brand.name}
                      className={styles.brandImage}
                      onError={(e) => {
                        e.target.style.display = "none"; // Hide broken image
                        e.target.nextSibling.style.display = "block"; // Show text fallback
                      }}
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

          {filteredBrands.length === 0 && (
            <p style={{ textAlign: "center", width: "100%" }}>
              {brands.length === 0 ? "Loading..." : "No brands found."}
            </p>
          )}
        </motion.div>

        <div className={styles.whyUsWrapper}>
          <BestInClassSection />
        </div>
      </div>
    </div>
  );
};

export default MobileRepairPage;
