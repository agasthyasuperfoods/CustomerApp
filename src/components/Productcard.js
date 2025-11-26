import React, { useState } from 'react';
import Image from 'next/image';

const variants = [
  { label: "500ml", price: 45 },
  { label: "1L", price: 95 }
];

const Productcard = ({
  product = {
    name: "A2 Buffalo Milk",
    oldPrice: 50,
    discount: 5,
    img: "/Milk.png", // <- Your milk pack image here!
  }
}) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  return (
    <div className="w-full px-2 py-4">
      <div className="bg-white rounded-2xl shadow-sm px-6 py-6 max-w-sm mx-auto flex flex-col items-center">
        {/* Product Image at the top */}
        <div style={{ width: 110, height: 110, position: "relative", marginBottom: 10 }}>
          <Image
            src={product.img}
            alt={product.name}
            width={110}
            height={110}
            style={{ objectFit: 'contain', borderRadius: 12 }}
            priority
          />
        </div>
        {/* Product Details and Actions */}
        <div className="w-full flex flex-col items-center min-w-0">
          {/* Name */}
          <div className="font-extrabold text-lg text-gray-900 text-center mb-1">
            {product.name}
          </div>
          {/* Price */}
          <div className="flex gap-2 items-center justify-center mb-2">
            <span className="text-gray-900 font-bold text-xl">&#8377;{selectedVariant.price.toFixed(2)}</span>
            <span className="text-gray-400 font-medium line-through text-md">{`₹${product.oldPrice.toFixed(2)}`}</span>
            <span className="text-amber-600 text-sm font-bold">{`₹${product.discount.toFixed(2)} OFF`}</span>
          </div>
          {/* Variant Selection */}
          <div className="flex gap-3 mb-4 justify-center">
            {variants.map(variant => (
              <button
                key={variant.label}
                onClick={() => setSelectedVariant(variant)}
                className={`border rounded-full px-5 py-1 text-sm font-semibold transition ${
                  selectedVariant.label === variant.label
                    ? 'bg-amber-100 border-amber-400 text-amber-900'
                    : 'bg-white border-gray-300 text-gray-700'
                }`}
              >
                {variant.label}
              </button>
            ))}
          </div>
          {/* Actions: ADD TO CART & SUBSCRIBE */}
          <div className="flex w-full gap-3">
            <button className="flex-grow bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-lg shadow text-base transition">
              ADD TO CART
            </button>
            <button className="border border-amber-400 text-amber-700 font-bold px-6 py-3 rounded-lg text-base bg-white transition hover:bg-amber-50 flex-shrink-0">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productcard;
