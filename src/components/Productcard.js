import React, { useState } from "react";
import Image from "next/image";

const variants = [
  { label: "500ml", price: 45.0 },
  { label: "1L", price: 95.0 },
];

const Productcard = ({
  product = {
    name: "A2 Buffalo Milk",
    oldPrice: 50.0,
    discount: 5.0,
    img: "/Milk.png",
  },
}) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  const currentPrice = selectedVariant.price;
  const oldPriceDisplay = product.oldPrice;
  const discountDisplay = product.discount;

  return (
    <div className="w-full px-2 py-5">
      <div className="bg-white rounded-2xl shadow-lg px-7 py-7 mx-auto flex flex-col items-center">

        {/* Product Image */}
        <div className="w-[110px] h-[110px] flex items-center justify-center mb-5">
          <Image
            src={product.img}
            alt={product.name}
            width={110}
            height={110}
            sizes="110px"
            priority
            className="object-contain"
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
          <span className="text-amber-600 text-base font-bold ml-1">
            ₹{discountDisplay.toFixed(2)} OFF
          </span>
        </div>

        {/* Variants */}
        <div className="flex gap-3 mb-5 justify-center">
          {variants.map((variant) => (
            <button
              key={variant.label}
              onClick={() => setSelectedVariant(variant)}
              className={`border rounded-full px-5 py-1 text-base font-semibold transition ${
                selectedVariant.label === variant.label
                  ? "bg-amber-100 border-amber-400 text-amber-900 shadow-sm"
                  : "bg-white border-gray-300 text-gray-700 hover:border-amber-200"
              }`}
            >
              {variant.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex w-full gap-3 mb-1">
          <button className="flex-1 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-lg shadow text-base transition">
            ADD TO CART
          </button>
          <button className="flex-1 border-2 border-amber-400 text-amber-700 font-bold rounded-lg py-3 text-base bg-white hover:bg-amber-50 transition">
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productcard;
