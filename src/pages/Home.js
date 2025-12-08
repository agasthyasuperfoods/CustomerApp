import React from "react";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

import FarmFreshBanner from "@/components/FarmFreshBanner";
import PopularDeliveryPlaces from "@/components/PopularDeliveryPlaces";
import Productcard from "@/components/Productcard";
import ProductSlide from "@/components/Productslide";
import FeaturesSection from "@/components/FeaturesSection";
import MilkPacketInfographic from "@/components/MilkPacketInfographic";

function Home() {
  return (
    <div
      style={{
        background: "#f6f7fa",
        minHeight: "100vh",
        paddingTop: "120px",      // ✅ Space for fixed NAV
        paddingBottom: "88px",  // ✅ Space for fixed FOOTER
      }}
    >
      {/* ✅ FIXED NAV */}
      <Nav />

      {/* ✅ MAIN CONTENT WRAPPER */}
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
          paddingLeft: 12,
          paddingRight: 12,
        }}
      >
        {/* ✅ HERO BANNER */}
        <div style={{ marginBottom: 22 }}>
          <FarmFreshBanner />
        </div>

        {/* ✅ DELIVERY AREAS */}
        <div style={{ marginBottom: 22 }}>
          <PopularDeliveryPlaces />
        </div>

        {/* ✅ PRODUCT + SLIDER */}
        <div style={{ marginBottom: 22 }}>
          <Productcard />
          <ProductSlide />
        </div>

        {/* ✅ FEATURES */}
        <div style={{ marginBottom: 22 }}>
          <FeaturesSection />
        </div>

        {/* ✅ MILK INFOGRAPHIC */}
        <div style={{ marginBottom: 10 }}>
          <MilkPacketInfographic />
        </div>
      </div>

      {/* ✅ FIXED FOOTER */}
      <Footer />
    </div>
  );
}

export default Home;
