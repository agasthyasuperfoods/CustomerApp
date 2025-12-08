import FarmFreshBanner from '@/components/FarmFreshBanner';
import FeaturesSection from '@/components/FeaturesSection';
import Nav from '@/components/Nav';
import MilkPacketInfographic from '@/components/MilkPacketInfographic';
import PopularDeliveryPlaces from '@/components/PopularDeliveryPlaces';
import Productcard from '@/components/Productcard';
import ProductSlide from '@/components/Productslide';
import React from 'react';
import Footer from '@/components/Footer';

function Home() {
  return (
    <div
      style={{
        background: "#f6f7fa",
        minHeight: "100vh",
        paddingBottom: "64px", // To prevent Gfooter overlap
      }}
    >
      <Nav />
      {/* Add padding top for the fixed nav */}
      <div style={{ maxWidth: 480, margin: "0 auto"}}>
        <div style={{ marginBottom: 22 }}>
          <FarmFreshBanner />
        </div>
        <div style={{ marginBottom: 22 }}>
          <PopularDeliveryPlaces />
        </div>
        <div style={{ marginBottom: 22 }}>
       
                 <Productcard />
   <ProductSlide />
          <FeaturesSection />
          <MilkPacketInfographic />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
