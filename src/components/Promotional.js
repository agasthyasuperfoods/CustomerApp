// // Add this to the top of the file to make it a client component
// 'use client';

// import React from 'react';
// import Image from 'next/image';

// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/autoplay';

// // import required modules
// import { Autoplay, Pagination } from 'swiper/modules';

// // --- SLIDE DATA ---
// // This data now uses concepts relevant to your brand.
// // You need to create these banner images and place them in the /public/images/ folder.
// const slidesData = [
//   {
//     id: 1,
//     image: '/Banner1.png', // A banner showing an Indian farm with Gir cows at sunrise.
//     headline: 'From Our Farm to Your Doorstep',
//     subheading: 'Experience the pure taste of milk from local farms, delivered fresh every morning.',
//     cta: 'Start Your Subscription',
//   },
//   {
//     id: 2,
//     image: '/Banner2.png', // A banner showing a happy family enjoying breakfast with your milk.
//     headline: 'The Heart of a Healthy Breakfast',
//     subheading: 'Nourish your family with the natural goodness of Agasthya Nutro Milk.',
//     cta: 'View Our Plans',
//   },
//   {
//     id: 3,
//     image: '/Banner3.png', // A banner featuring a beautiful shot of your Milk.png product.
//     headline: 'Purity in Every Drop',
//     subheading: 'Ethically sourced and rigorously tested to ensure the highest quality for you.',
//     cta: 'Learn About Our Process',
//   },
// ];


// const PromotionalBanner = () => {
//   return (
//     <div className="w-full">
//       <Swiper
//         modules={[Autoplay, Pagination]}
//         spaceBetween={0}
//         slidesPerView={1}
//         loop={true}
//         autoplay={{
//           delay: 5000,
//           disableOnInteraction: false,
//         }}
//         pagination={{
//           clickable: true,
//         }}
//         className="w-full h-[60vh] max-h-[500px]"
//       >
//         {slidesData.map((slide) => (
//           <SwiperSlide key={slide.id}>
//             <div className="relative w-full h-full">
//               <Image
//                 src={slide.image}
//                 alt={slide.headline}
//                 layout="fill"
//                 objectFit="cover"
//                 className="brightness-75"
//               />
//               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
//                 <h1 
//                   className="text-white font-bold text-4xl md:text-5xl" 
//                   style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
//                 >
//                   {slide.headline}
//                 </h1>
//                 <p 
//                   className="text-white text-lg md:text-xl mt-4 max-w-lg"
//                   style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
//                 >
//                   {slide.subheading}
//                 </p>
//                 <button className="mt-8 bg-yellow-400 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-105">
//                   {slide.cta}
//                 </button>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default PromotionalBanner;

'use client';
import React from 'react';

// --- (No changes needed for SVG Icons) ---
const CowIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M14 6V4H9v2h5zm2 1v3.28c-2.37.53-4.58 1.54-6.26 2.72H3v-3h2V8H3V6h3.61C7.3 4.28 9.08 3 11.25 3c2.44 0 4.45 1.95 4.5 4.36l.24.04c1.1 0 2 1.12 2 2.5v.14c.69-.17 1.32-.4 1.9-.7l.48-6.14H22l-1.12 11.22c-.14 1.42-1.37 2.54-2.79 2.54-1.29 0-2.39-1.03-2.7-2.39l-.8-3.61c-.55.24-1.08.43-1.59.56V14h-2v-1.14c1.67-1.02 3.19-2.4 4-3.86zm-2.75 3c-.69 0-1.25-.45-1.25-1s.56-1 1.25-1 1.25.45 1.25 1-.56 1-1.25 1z" />
  </svg>
);
const MilkingIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M8 5H4v14h4V5zm2 0v14h4V5h-4zm6 0h-4v14h4V5zM19 3v18h2V3h-2z" /><path d="M2 19V4h1V2H1a1 1 0 00-1 1v17h2zm19-1v2h1a1 1 0 001-1V3h-2v16z" />
  </svg>
);
const ChillingIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2L9.17 6.32 5.5 5.5l.32 4.17-3.41.32.32 3.41-4.17-.32.32 3.41.32 4.17L12 22l8.83-8.83L12 2zm0 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
  </svg>
);
const TestingIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16 2H8C4.69 2 2 4.69 2 8v8c0 3.31 2.69 6 6 6h8c3.31 0 6-2.69 6-6V8c0-3.31-2.69-6-6-6zm-1.89 12.11L10 18l-4.11-4.11c-.39-.39-.39-1.02 0-1.41l.71-.71c.39-.39 1.02-.39 1.41 0L10 13.17l2.88-2.88c.39-.39 1.02-.39 1.41 0l.71.71c.39.39.39 1.02 0 1.41z" />
  </svg>
);
const BottlingIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M15 2H9v4h6V2zM7 8v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H7zm-2 0H3v12c0 2.21 1.79 4 4 4h10c2.21 0 4-1.79 4-4V8h-2v12c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2V8z" />
  </svg>
);
const DeliveryIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm13.5-8.5l1.96 2.5H17V9.5h2.5zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
  </svg>
);

// --- Timeline Data with better placeholder images ---
const timelineSteps = [
  { icon: CowIcon, title: 'Happy Cows', description: 'Our cows are pasture-raised and cared for daily.', imageUrl: 'https://images.unsplash.com/photo-1596423450411-53359146d2a7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600' },
  { icon: MilkingIcon, title: 'Hygienic Milking', description: 'Milked twice a day in a pristine, modern facility.', imageUrl: 'https://images.unsplash.com/photo-1620266757108-e8751723a858?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600' },
  { icon: ChillingIcon, title: 'Quick Chilling', description: 'Chilled immediately to lock in freshness.', imageUrl: 'https://images.unsplash.com/photo-1543265223-883a04a37e54?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600' },
  { icon: TestingIcon, title: 'Quality Testing', description: 'Every batch is tested for purity and quality.', imageUrl: 'https://images.unsplash.com/photo-1578496469234-13c51368b6a3?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600' },
  { icon: BottlingIcon, title: 'Eco-Friendly Bottling', description: 'Bottled in reusable glass to protect taste.', imageUrl: 'https://images.unsplash.com/photo-1601056582522-385a86ddf3a4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600' },
  { icon: DeliveryIcon, title: 'Early Morning Delivery', description: 'Delivered to your doorstep before sunrise.', imageUrl: 'https://images.unsplash.com/photo-1601503194303-34537b86435c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600' },
];

// --- A more dynamic and stylish Timeline Step component ---
const TimelineStep = ({ step, index }) => {
  // Determine if the step is on the left or right side of the timeline
  const isLeft = index % 2 === 0;

  return (
    <div className="flex w-full mx-auto items-center justify-between">
      {/* --- Left Side Card --- */}
      <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-8' : 'md:pl-8 md:order-2'}`}>
        <div className="relative overflow-hidden rounded-2xl shadow-lg h-56 flex flex-col justify-end p-6 text-white transition-transform duration-300 ease-in-out hover:scale-105">
          <img src={step.imageUrl} alt={step.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold">{step.title}</h3>
            <p className="mt-1 text-sm text-white/90">{step.description}</p>
          </div>
        </div>
      </div>
      
      {/* --- Center Timeline Dot & Icon --- */}
      <div className="hidden md:flex w-1/12 items-center justify-center order-1">
        <div className="z-10 bg-white shadow-md flex items-center justify-center w-14 h-14 rounded-full border-4 border-slate-50">
           <step.icon className="h-7 w-7 text-orange-500" />
        </div>
      </div>

    </div>
  );
};

// --- Main Timeline Component ---
export default function FarmToDoorTimeline() {
  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4">
        {/* --- Section Header --- */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Our Path to Purity
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Follow the journey your milk takes from our farm to your family, every single step.
          </p>
        </div>

        {/* --- Vertical Timeline Container --- */}
        <div className="relative">
          {/* The vertical line that connects the dots */}
          <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-1 -translate-x-1/2 bg-gray-300 rounded-full"></div>

          <div className="space-y-12">
            {timelineSteps.map((step, index) => (
              <TimelineStep
                key={step.title}
                step={step}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}