import FooterNavigation from '@/components/Footer'
import Nav from '@/components/Nav'
import ProductCard from '@/components/ProductCard'
import PromotionalBanner from '@/components/Promotional'
import Recent from '@/components/Recent'
import SearchBar from '@/components/SepNav'
import ShopByMilkType from '@/components/ShopbyM'
import WhyChooseUs from '@/components/WhyChooseus'
import React from 'react'

function index() {
  return (
    <div>
      <Nav />
      <PromotionalBanner />
      <ProductCard />
      <WhyChooseUs />
       <Recent />
      <ShopByMilkType />
     
      <FooterNavigation />
    </div>
  )
}

export default index



