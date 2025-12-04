import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import HomePage from "../pages/HomePage/HomePage";
import ContactUsPage from "../components/ContactUsPage/ContactUsPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import ArticleDetailPage from "../pages/ArticleDetailPage/ArticleDetailPage";
import SpotlightPage from "../pages/SpotlightPage/SpotlightPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage/PrivacyPolicyPage";
import TermsPage from "../pages/TermsPage/TermsPage";
import WarrantyPage from "../pages/WarrantyPage/WarrantyPage";
import PartnerPage from "../pages/PartnerPage/PartnerPage";
import FaqPage from "../pages/FaqPage/FaqPage";
// import BrandPage from "../pages/BrandPage/BrandPage";
import RepairPage from "../pages/RepairPage/RepairPage";
import ModelRepairPage from "../pages/ModelRepairPage/ModelRepairPage";
import AddressInfoPage from "../pages/AddressInfoPage/AddressInfoPage";
import MyOrdersPage from "../pages/MyOrdersPage/MyOrdersPage";
import BookingSuccessPage from "../pages/BookingSuccessPage/BookingSuccessPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import PickupChecklistPage from "../pages/PickupChecklistPage/PickupChecklistPage";
import ServicesPage from "../pages/ServicesPage/ServicesPage";
import MobileRepairPage from "../pages/MobileRepairPage/MobileRepairPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Parent Route: The Layout */}
        <Route path="/" element={<DashboardLayout />}>
          {/* Child Route: The HomePage */}
          <Route index element={<HomePage />} />
          <Route path="contact" element={<ContactUsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="spotlight" element={<SpotlightPage />} />
          <Route path="spotlight/:id" element={<ArticleDetailPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="warranty" element={<WarrantyPage />} />
          <Route path="partner" element={<PartnerPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="repair-brand/:brandName" element={<RepairPage />} />
          <Route path="repair/model/:modelName" element={<ModelRepairPage />} />
          <Route path="checkout" element={<AddressInfoPage />} />
          <Route path="booking-success" element={<BookingSuccessPage />} />
          <Route path="orders" element={<MyOrdersPage />} />
          <Route path="pickup-checklist" element={<PickupChecklistPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="repair/mobile" element={<MobileRepairPage />} />
          // Inside Routes
          <Route path="services" element={<ServicesPage />} />
          // Optional: Handle sub-routes if needed (e.g., redirects)
          <Route path="services/iphone" element={<ServicesPage />} />
          <Route path="services/macbook" element={<ServicesPage />} />
          {/* <Route path="about" element={<AboutPage />} />
          <Route path="treatments" element={<TreatmentsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="contact" element={<ContactUsPage />} />

         
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="blogs/:id" element={<BlogDetailsPage />} /> */}
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
}
