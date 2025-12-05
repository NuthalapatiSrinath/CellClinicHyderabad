import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { brandsData } from "../../data/brands";
import styles from "./RepairPage.module.css";
import {
  Search,
  Smartphone,
  Battery,
  Zap,
  Camera,
  Settings,
  Disc,
  Headphones,
} from "lucide-react";

// --- Helper to Get Icons ---
const getIcon = (title) => {
  const t = title ? title.toLowerCase() : "";

  if (t.includes("screen") || t.includes("display"))
    return <Smartphone size={40} color="#2563eb" />;
  if (t.includes("battery")) return <Battery size={40} color="#22c55e" />;
  if (t.includes("charging") || t.includes("port"))
    return <Zap size={40} color="#eab308" />;
  if (t.includes("camera") || t.includes("lens"))
    return <Camera size={40} color="#f97316" />;
  if (t.includes("back panel") || t.includes("glass"))
    return <Disc size={40} color="#ef4444" />;
  if (t.includes("headphone") || t.includes("jack"))
    return <Headphones size={40} color="#8b5cf6" />;

  return <Settings size={40} color="#6b7280" />;
};

const RepairPage = () => {
  const { brandName } = useParams();
  const key = brandName ? brandName.toLowerCase() : "apple";
  const data = brandsData[key] || brandsData["apple"];

  // --- Search State ---
  const [searchQuery, setSearchQuery] = useState("");

  // --- Filter Models Logic ---
  const filteredModels = data.models
    ? data.models.filter((model) =>
        model.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
    setSearchQuery(""); // Reset search when brand changes

    // --- Console Logs for Debugging ---
    console.log("RepairPage Loaded");
    console.log("Brand Name from URL:", brandName);
    console.log("Data Key used:", key);
    console.log("Loaded Data:", data);
    console.log("Available Models:", data.models);
    console.log("Available Services:", data.services);
  }, [brandName, key, data]);

  // Log filtered models whenever search query changes
  useEffect(() => {
    console.log("Search Query:", searchQuery);
    console.log("Filtered Models:", filteredModels);
  }, [searchQuery, filteredModels]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* --- Header --- */}
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>{data.title}</h1>
          <p className={styles.breadcrumbs}>
            <Link to="/">Home</Link> &gt; Repair &gt; {data.name}
          </p>
        </div>

        {/* --- Model Grid --- */}
        <div className={styles.modelSection}>
          <div className={styles.modelHeader}>
            <h3>{data.subtitle || "Select Model"}</h3>
            <div className={styles.searchBox}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Select Model"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.modelGrid}>
            {filteredModels.length > 0 ? (
              filteredModels.map((model, idx) => (
                /* Wrap the model card in NavLink to make it clickable */
                <NavLink
                  key={idx}
                  to={`/repair/model/${encodeURIComponent(model.name)}`}
                  className={styles.modelLink}
                  style={{ textDecoration: "none" }}
                  onClick={() => console.log("Clicked Model:", model.name)} // Log click
                >
                  <motion.div
                    className={styles.modelCard}
                    whileHover={{ y: -5, borderColor: "var(--Primary_Color)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <img
                      src={model.img}
                      alt={model.name}
                      className={styles.modelImg}
                    />
                    <p>{model.name}</p>
                  </motion.div>
                </NavLink>
              ))
            ) : (
              <p className={styles.noModels}>
                {data.models && data.models.length > 0
                  ? "No models match your search."
                  : "Models coming soon..."}
              </p>
            )}
          </div>
        </div>

        {/* --- Hero Banner --- */}
        <div className={styles.brandHero}>
          <h2>
            {data.heroText ||
              `EXPERT ${data.name.toUpperCase()} REPAIR SERVICES`}
          </h2>
          <p>
            {data.heroDesc ||
              "We provide top-notch repair services for all models."}
          </p>
        </div>

        {/* --- Why Us Section --- */}
        <div className={styles.whyUs}>
          <h3>WHY CELL CLINIC?</h3>
          <div className={styles.redLine}></div>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <h4>5000+ Devices Repaired</h4>
              <p>With a track record of repairing over 5000 devices.</p>
            </div>
            <div className={styles.statItem}>
              <h4>4.9/5 Average Rating</h4>
              <p>Our exceptional service is reflected in our high ratings.</p>
            </div>
            <div className={styles.statItem}>
              <h4>Certified Warranty</h4>
              <p>We stand by quality with a certified warranty.</p>
            </div>
            <div className={styles.statItem}>
              <h4>Skilled Technicians</h4>
              <p>Our skilled technicians bring expertise and precision.</p>
            </div>
          </div>
        </div>

        {/* --- SERVICES LIST --- */}
        {data.services && data.services.length > 0 && (
          <div className={styles.servicesList}>
            <h3 className={styles.sectionHeading}>
              WE FIX ALL COMMON {data.name.toUpperCase()} TECHNICAL ISSUES
            </h3>
            <div className={styles.redLine}></div>

            <div className={styles.servicesGrid}>
              {data.services.map((service, idx) => (
                <motion.div
                  key={idx}
                  className={styles.serviceCard}
                  whileHover={{
                    x: 5,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {/* Icon Box */}
                  <div className={styles.serviceIcon}>
                    {getIcon(service.title)}
                  </div>

                  {/* Text Content */}
                  <div className={styles.serviceText}>
                    <h4>{service.title}::</h4>
                    <p>{service.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepairPage;
