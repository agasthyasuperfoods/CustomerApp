import React, { useState } from 'react';
import Image from 'next/image';

const variants = [
  { label: "500ml", price: 45.00 },
  { label: "1L", price: 95.00 }
];

const Productcard = ({
  product = {
    name: "A2 Buffalo Milk",
    oldPrice: 50.00,
    discount: 5.00,
    img: "/Milk.png" // Ensure this path is correct for your project
  }
}) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  // Determine the price and discount dynamically based on the selected variant if needed, 
  // but for simplicity, we'll use the fixed product structure here.
  const currentPrice = selectedVariant.price;
  const oldPriceDisplay = product.oldPrice;
  const discountDisplay = product.discount;


  return (
    // Outer container for spacing and centering
    <div className="w-full px-2 py-5">
      {/* Main Card Container: Uses rounded-2xl for prominent corners */}
      <div className="bg-white rounded-2xl shadow-lg px-7 py-7 mx-auto flex flex-col items-center">
        
        {/* Product Image Placeholder */}
        <div style={{
          width: 110,
          height: 110,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20
        }}>
          {/* Note: You must have an image at /Milk.png in your public directory */}
          <Image
            src={product.img}
            alt={product.name}
            width={110}
            height={110}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        
        {/* Product Name */}
        <div className="font-extrabold text-xl text-gray-900 text-center mb-2">
          {product.name}
        </div>
        
        {/* Price Section */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-gray-900 font-bold text-[22px]">
            ₹{currentPrice.toFixed(2)}
          </span>
          <span className="text-gray-400 font-semibold line-through text-base mt-1">
            ₹{oldPriceDisplay.toFixed(2)}
          </span>
          {/* Using text-amber-600 for the discount text */}
          <span className="text-amber-600 text-base font-bold ml-1">
            ₹{discountDisplay.toFixed(2)} OFF
          </span>
        </div>
        
        {/* Variant Selection */}
        <div className="flex gap-3 mb-5 justify-center">
          {variants.map(variant => (
            <button
              key={variant.label}
              onClick={() => setSelectedVariant(variant)}
              className={`border rounded-full px-5 py-1 text-base font-semibold focus:outline-none transition ${
                selectedVariant.label === variant.label
                  ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-sm' // Active state matches brand yellow
                  : 'bg-white border-gray-300 text-gray-700 hover:border-amber-200'
              }`}
            >
              {variant.label}
            </button>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex w-full gap-3 mb-1">
          {/* Primary CTA: Solid Amber */}
          <button className="flex-1 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-lg shadow text-base transition duration-150 ease-in-out">
            ADD TO CART
          </button>
          
          {/* Secondary CTA: Bordered Amber */}
          <button className="flex-1 border-2 border-amber-400 text-amber-700 font-bold rounded-lg py-3 text-base bg-white transition duration-150 ease-in-out hover:bg-amber-50">
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productcard;