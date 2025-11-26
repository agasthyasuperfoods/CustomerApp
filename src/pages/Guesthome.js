import FarmFreshBanner from '@/components/FarmFreshBanner';
import FeaturesSection from '@/components/FeaturesSection';
import Gfooter from '@/components/Gfooter';
import Guestnav from '@/components/Guestnav';
import MilkPacketInfographic from '@/components/MilkPacketInfographic';
import PopularDeliveryPlaces from '@/components/PopularDeliveryPlaces';
import Productcard from '@/components/Productcard';
import React from 'react';

function Guesthome() {
  return (
    <div
      style={{
        background: "#f6f7fa",
        minHeight: "100vh",
        paddingBottom: "64px", // To prevent Gfooter overlap
      }}
    >
      <Guestnav />
      {/* Add padding top for the fixed nav */}
      <div style={{ maxWidth: 480, margin: "0 auto", paddingTop: 120 }}>
        <div style={{ marginBottom: 22 }}>
          <FarmFreshBanner />
        </div>
        <div style={{ marginBottom: 22 }}>
          <PopularDeliveryPlaces />
        </div>
        <div style={{ marginBottom: 22 }}>
          <Productcard />
          <FeaturesSection />
          {/* <MilkPacketInfographic /> */}
        </div>
      </div>
      <Gfooter />
    </div>
  );
}

export default Guesthome;
