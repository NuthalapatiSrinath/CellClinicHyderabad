import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import RenderModal from "./modals/RenderModal/RenderModal";
import { catalogService } from "./services/catalogService"; // <--- Import Service

function App() {
  const theme = useSelector((state) => state.theme.mode);
  const isModalOpen = useSelector((state) => state.modal.isOpen);

  // 1. Theme Effect
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // 2. PREFETCH DATA (With Console Logs)
  useEffect(() => {
    const prefetchData = async () => {
      console.log("🚀 [App] App Mounted. Starting Data Prefetch...");

      try {
        // A. Fetch Brands Immediately
        const brandsRes = await catalogService.getBrands();

        if (brandsRes.success && brandsRes.data) {
          const brandNames = brandsRes.data.map((b) => b.name).join(", ");
          console.log(
            `✅ [App] Brands Preloaded (${brandsRes.data.length}):`,
            brandNames
          );

          // B. Fetch Devices for each Brand (Delayed to prioritize UI)
          setTimeout(() => {
            console.log(
              "⏳ [App] Starting Background Device Prefetch (2s delay)..."
            );

            brandsRes.data.forEach((brand) => {
              // We call this so the data gets saved into Session Storage
              catalogService.getDevices(brand._id);
              console.log(`   ↳ 📲 Prefetching devices for: ${brand.name}`);
            });
          }, 2000);
        }
      } catch (err) {
        console.warn("❌ [App] Prefetch failed:", err);
      }
    };

    prefetchData();
  }, []);

  return (
    <div className="App">
      <AppRoutes />

      {isModalOpen && <RenderModal />}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme={theme === "dark" ? "dark" : "light"}
      />
    </div>
  );
}

export default App;
