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

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// --- Icon components (no changes) ---
const CowIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M14 6V4H9v2h5zm2 1v3.28c-2.37.53-4.58 1.54-6.26 2.72H3v-3h2V8H3V6h3.61C7.3 4.28 9.08 3 11.25 3c2.44 0 4.45 1.95 4.5 4.36l.24.04c1.1 0 2 1.12 2 2.5v.14c.69-.17 1.32-.4 1.9-.7l.48-6.14H22l-1.12 11.22c-.14 1.42-1.37 2.54-2.79 2.54-1.29 0-2.39-1.03-2.7-2.39l-.8-3.61c-.55.24-1.08.43-1.59.56V14h-2v-1.14c1.67-1.02 3.19-2.4 4-3.86zm-2.75 3c-.69 0-1.25-.45-1.25-1s.56-1 1.25-1 1.25.45 1.25 1-.56 1-1.25 1z" /></svg>);
const MilkingIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M8 5H4v14h4V5zm2 0v14h4V5h-4zm6 0h-4v14h4V5zM19 3v18h2V3h-2z" /><path d="M2 19V4h1V2H1a1 1 0 00-1 1v17h2zm19-1v2h1a1 1 0 001-1V3h-2v16z" /></svg>);
const ChillingIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2L9.17 6.32 5.5 5.5l.32 4.17-3.41.32.32 3.41-4.17-.32.32 3.41.32 4.17L12 22l8.83-8.83L12 2zm0 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" /></svg>);
const TestingIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M16 2H8C4.69 2 2 4.69 2 8v8c0 3.31 2.69 6 6 6h8c3.31 0 6-2.69 6-6V8c0-3.31-2.69-6-6-6zm-1.89 12.11L10 18l-4.11-4.11c-.39-.39-.39-1.02 0-1.41l.71-.71c.39-.39 1.02-.39 1.41 0L10 13.17l2.88-2.88c.39-.39 1.02-.39 1.41 0l.71.71c.39.39.39 1.02 0 1.41z" /></svg>);
const BottlingIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M15 2H9v4h6V2zM7 8v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H7zm-2 0H3v12c0 2.21 1.79 4 4 4h10c2.21 0 4-1.79 4-4V8h-2v12c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2V8z" /></svg>);
const DeliveryIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm13.5-8.5l1.96 2.5H17V9.5h2.5zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" /></svg>);

// --- Timeline data ---
const timelineSteps = [
    { step: '01', Icon: CowIcon, title: 'Happy Cows', description: 'Our cows are pasture-raised, stress-free, and cared for daily to produce the highest quality milk.', imageUrl: 'https://images.pexels.com/photos/162240/bull-calf-heifer-ko-162240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { step: '02', Icon: MilkingIcon, title: 'Hygienic Milking', description: 'We use modern, sanitized equipment to milk our cows twice a day in a pristine environment.', imageUrl: 'https://images.pexels.com/photos/7524835/pexels-photo-7524835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { step: '03', Icon: ChillingIcon, title: 'Quick Chilling', description: 'The milk is chilled to 4°C immediately after milking to lock in its freshness, taste, and nutritional value.', imageUrl: 'https://images.pexels.com/photos/8031930/pexels-photo-8031930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { step: '04', Icon: TestingIcon, title: 'Rigorous Quality Testing', description: 'Every single batch undergoes more than 25 quality tests to ensure it is free from any impurities.', imageUrl: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { step: '05', Icon: BottlingIcon, title: 'Eco-Friendly Bottling', description: 'To protect the environment and the milk’s taste, we bottle our product in sterilized, reusable glass bottles.', imageUrl: 'https://images.pexels.com/photos/7148386/pexels-photo-7148386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { step: '06', Icon: DeliveryIcon, title: 'Sunrise Delivery', description: 'Your fresh milk is delivered to your doorstep before 7 AM, ensuring a healthy start to your day.', imageUrl: 'https://images.pexels.com/photos/7772635/pexels-photo-7772635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
];

// --- Timeline Step component ---
const TimelineStep = React.forwardRef(({ step, isVisible }, ref) => {
    const { Icon, title, description, imageUrl, step: stepNumber } = step;
    return (
        <div ref={ref} className="relative flex items-start gap-6 md:gap-12">
            {/* Icon and Line */}
            <div className="flex flex-col items-center h-full">
                <div className={`flex-shrink-0 z-10 grid place-items-center bg-white border-2 rounded-full w-14 h-14 transition-all duration-500 ease-in-out ${isVisible ? 'border-amber-500 scale-100' : 'border-slate-300 scale-90'}`}>
                    <Icon className={`w-7 h-7 transition-colors duration-500 ${isVisible ? 'text-amber-600' : 'text-slate-400'}`} />
                </div>
                <div className="flex-grow w-0.5 bg-slate-200 mt-2"></div>
            </div>

            {/* Content Card */}
            <div className={`pt-2 w-full transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                <div className="bg-white rounded-xl shadow-lg shadow-slate-200/60 overflow-hidden ring-1 ring-slate-100">
                    <div className="relative w-full aspect-[16/10] group">
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{ objectFit: 'cover' }}
                            className="transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                    <div className="p-5 md:p-6">
                        <p className="text-amber-600 font-semibold text-sm tracking-wider uppercase">Step {stepNumber}</p>
                        <h3 className="text-2xl font-bold text-slate-800 mt-1">{title}</h3>
                        <p className="mt-3 text-slate-600 leading-relaxed">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
});
TimelineStep.displayName = 'TimelineStep';

// --- Main component ---
export default function Promotional() {
    const [visibleSteps, setVisibleSteps] = useState(new Set());
    const stepRefs = useRef([]);

    // MODIFIED: This useEffect is now fixed to prevent the build warning.
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = parseInt(entry.target.dataset.index, 10);
                    if (entry.isIntersecting) {
                        setVisibleSteps(prev => new Set(prev).add(index));
                    }
                });
            },
            {
                rootMargin: '0px',
                threshold: 0.4, // Trigger when 40% of the element is visible
            }
        );

        // Copy ref's current value to a variable to use in the cleanup function
        const elementsToObserve = stepRefs.current;

        elementsToObserve.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            elementsToObserve.forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    // Helper to assign refs
    const setRef = (el, index) => {
        stepRefs.current[index] = el;
    };

    return (
        <section className="bg-slate-50 py-20 md:py-24">
            <div className="mx-auto max-w-4xl px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
                        Our Path to Purity
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                        Follow the journey your milk takes from our farm to your family, every single step.
                    </p>
                    <div className="mt-6 w-24 h-1.5 bg-amber-400 mx-auto rounded-full"></div>
                </div>

                {/* Vertical Timeline Container */}
                <div className="relative max-w-lg mx-auto md:max-w-none">
                     <div className="space-y-12">
                        {timelineSteps.map((step, index) => (
                           <div key={index} data-index={index} ref={(el) => setRef(el, index)}>
                                <TimelineStep
                                    step={step}
                                    isVisible={visibleSteps.has(index)}
                                />
                           </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
