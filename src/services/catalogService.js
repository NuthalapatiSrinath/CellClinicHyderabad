import apiClient from "../api/apiClient";

// Keys for storage
const CACHE_KEYS = {
  BRANDS: "cc_cache_brands",
  DEVICES: (id) => `cc_cache_devices_${id}`,
  SERVICES: (id) => `cc_cache_services_${id}`,
};

export const catalogService = {
  // --- READ BRANDS (Cached) ---
  getBrands: async () => {
    try {
      // 1. Check Cache
      const cached = sessionStorage.getItem(CACHE_KEYS.BRANDS);
      if (cached) return JSON.parse(cached);

      // 2. Fetch API
      const response = await apiClient.get("/catalog/brands");

      // 3. Save to Cache
      if (response.success) {
        sessionStorage.setItem(CACHE_KEYS.BRANDS, JSON.stringify(response));
      }
      return response;
    } catch (error) {
      console.error("Error fetching brands:", error);
      return { success: false, data: [] };
    }
  },

  // --- READ DEVICES (Cached by Brand) ---
  getDevices: async (brandId) => {
    try {
      const key = CACHE_KEYS.DEVICES(brandId);
      const cached = sessionStorage.getItem(key);
      if (cached) return JSON.parse(cached);

      const response = await apiClient.get(`/catalog/devices/${brandId}`);

      if (response.success) {
        sessionStorage.setItem(key, JSON.stringify(response));
      }
      return response;
    } catch (error) {
      console.error("Error fetching devices:", error);
      return { success: false, data: [] };
    }
  },

  // --- READ SERVICES (Cached by Device) ---
  getServices: async (deviceId) => {
    try {
      const key = CACHE_KEYS.SERVICES(deviceId);
      const cached = sessionStorage.getItem(key);
      if (cached) return JSON.parse(cached);

      const response = await apiClient.get(`/catalog/services/${deviceId}`);

      if (response.success) {
        sessionStorage.setItem(key, JSON.stringify(response));
      }
      return response;
    } catch (error) {
      console.error("Error fetching services:", error);
      return { success: false, data: [] };
    }
  },

  // --- HELPER: Clear Cache (Optional, useful if you have a refresh button) ---
  clearCache: () => {
    sessionStorage.clear();
  },
};
