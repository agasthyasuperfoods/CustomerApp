"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

/* Re-mapped bubbles for the wider image */
const bubbles = [
  // LEFT SIDE
  { text: "Protein",         x: -160, y: -60 },
  { text: "Calcium",         x: -175, y: 20 },
  { text: "Healthy Bones",   x: -150, y: 110 },

  // RIGHT SIDE
  { text: "Minerals",        x: 160,  y: -60 },
  { text: "Vitamin D",       x: 175,  y: 20 },
  { text: "Good Digestion",  x: 150,  y: 110 }
];

export default function MilkPacketInfographic() {
  const imageRef = useRef(null);
  const bubbleRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.9, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45 }
    );

    tl.fromTo(
      bubbleRefs.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.06 },
      "-=0.15"
    );
  }, []);

  return (
    <div className="mx-2 rounded-xl shadow-lg overflow-hidden  ">
      <div
        className="rounded-2xl flex flex-col items-center"
        style={{
          backgroundColor: "#4bb6ff",
          width: 430,
          paddingTop: 50,
          paddingBottom: 90,
          paddingLeft: 20,
          paddingRight: 20
        }}
      >
        {/* Heading */}
        <h2
          className="font-extrabold text-white text-center"
          style={{ fontSize: 20, lineHeight: "24px" }}
        >
          Power in Every Glass
        </h2>

        <p
          className="text-white/90 text-center mt-1 mb-2"
          style={{ fontSize: 12.5, lineHeight: "17px" }}
        >
          Rich in protein, minerals and calcium to support strong bones and better digestion.
        </p>

        {/* Main content area */}
        <div
          className="relative flex items-center justify-center mx-2 pt-20"
        
        >
          {/* Center Image shifted downward */}
          <div
            ref={imageRef}
            className="z-20"
   
          >
            <Image
              src="/milkarm.png"
              alt="Agasthya A2 Buffalo Milk"
              width={300}
              height={260}
              className="object-contain select-none"
              draggable={false}
              priority
            />
          </div>

          {/* Bubbles */}
          {bubbles.map((b, i) => (
            <div
              key={b.text}
              ref={(el) => (bubbleRefs.current[i] = el)}
              className="absolute z-10 flex items-center justify-center"
              style={{
                left: `calc(50% + ${b.x}px)`,
                top: `calc(50% + ${b.y}px)`,
                transform: "translate(-50%, -50%)"
              }}
            >
              <button
                className="rounded-full font-semibold whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.18)] transition-all"
                style={{
                  padding: "6px 16px",
                  fontSize: 11,
                  backgroundColor: "rgb(47, 192, 245)",
                  color: "white"
                }}
              >
                {b.text}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
