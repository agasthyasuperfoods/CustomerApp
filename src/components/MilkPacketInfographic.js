"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const leftBubbles = [
  { text: "Protein",       x: "-130px", y: "-40px" },
  { text: "Calcium",       x: "-130px", y: "35px" },
  { text: "Healthy Bones", x: "-115px", y: "105px" }
];

const rightBubbles = [
  { text: "Minerals",      x: "130px", y: "-40px" },
  { text: "Vitamin D",     x: "130px", y: "35px" },
  { text: "Good Digestion",x: "115px", y: "105px" }
];

export default function MilkPacketInfographic() {
  const imageRef = useRef(null);
  const bubbleRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      imageRef.current,
      { scale: 0.9, opacity: 0, y: 16 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5 }
    );

    tl.fromTo(
      bubbleRefs.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.06 },
      "-=0.1"
    );

    return () => tl.kill();
  }, []);

  return (
    <div className="w-full px-2 py-4 flex justify-center">
      <div
        className="rounded-3xl px-5 pt-6 pb-8 max-w-md w-full flex flex-col items-center"
        style={{ backgroundColor: "#4bb6ff" }}
      >
        <h2 className="text-[22px] font-extrabold text-white">
          Power in Every Glass
        </h2>
        <p className="mt-2 mb-4 text-[13px] text-white/90 text-center leading-snug">
          Naturally rich in protein, minerals and calcium to support strong
          bones, better digestion and everyday energy.
        </p>

        <div className="relative w-full flex items-center justify-center">
          {/* Center image (on top of everything) */}
          <div ref={imageRef} className="z-20">
            <Image
              src="/arms.png"
              alt="Agasthya A2 Buffalo Milk"
              width={250}
              height={250}
              className="object-contain select-none"
              draggable={false}
              priority
            />
          </div>

          {/* LEFT bubbles */}
          {leftBubbles.map((b, i) => (
            <div
              key={b.text}
              ref={(el) => (bubbleRefs.current[i] = el)}
              className="absolute flex items-center justify-center z-10"
              style={{
                left: `calc(50% + ${b.x})`,
                top:  `calc(50% + ${b.y})`,
                transform: "translate(-50%, -50%)"
              }}
            >
              <button
                className="px-4 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
                style={{
                  backgroundColor: "rgb(47, 192, 245)",
                  color: "rgb(255, 255, 255)"
                }}
              >
                {b.text}
              </button>
            </div>
          ))}

          {/* RIGHT bubbles */}
          {rightBubbles.map((b, idx) => (
            <div
              key={b.text}
              ref={(el) => (bubbleRefs.current[leftBubbles.length + idx] = el)}
              className="absolute flex items-center justify-center z-10"
              style={{
                left: `calc(50% + ${b.x})`,
                top:  `calc(50% + ${b.y})`,
                transform: "translate(-50%, -50%)"
              }}
            >
              <button
                className="px-4 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
                style={{
                  backgroundColor: "rgb(47, 192, 245)",
                  color: "rgb(255, 255, 255)"
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
