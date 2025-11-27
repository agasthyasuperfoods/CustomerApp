"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const leftBubbles = [
  { text: "Protein",       x: -135, y: -40 },
  { text: "Calcium",       x: -135, y: 40 },
  { text: "Healthy Bones", x: -115, y: 120 }
];

const rightBubbles = [
  { text: "Minerals",       x: 135, y: -40 },
  { text: "Vitamin D",      x: 135, y: 40 },
  { text: "Good Digestion", x: 115, y: 120 }
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
    <div className="w-full flex justify-center px-2 py-4">
      {/* Fixed-width card for consistent layout across devices */}
      <div
        className="rounded-3xl flex flex-col items-center"
        style={{
          backgroundColor: "#4bb6ff",
          width: 360,          // lock card width
          paddingTop: 24,
          paddingBottom: 32,
          paddingLeft: 20,
          paddingRight: 20
        }}
      >
        <h2
          className="font-extrabold text-white text-center"
          style={{ fontSize: 22, lineHeight: "26px" }}
        >
          Power in Every Glass
        </h2>
        <p
          className="text-white/90 text-center mt-2 mb-4"
          style={{ fontSize: 13, lineHeight: "18px" }}
        >
          Naturally rich in protein, minerals and calcium to support strong
          bones, better digestion and everyday energy.
        </p>

        <div
          className="relative flex items-center justify-center"
          style={{ width: "100%", height: 260 }}
        >
          {/* Center image */}
          <div ref={imageRef} className="z-20">
            <Image
              src="/arms.png"
              alt="Agasthya A2 Buffalo Milk"
              width={240}
              height={240}
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
              className="absolute z-10 flex items-center justify-center"
              style={{
                left: `calc(50% + ${b.x}px)`,
                top: `calc(50% + ${b.y}px)`,
                transform: "translate(-50%, -50%)"
              }}
            >
              <button
                className="rounded-full font-semibold whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
                style={{
                  padding: "6px 16px",
                  fontSize: 11,
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
              ref={(el) =>
                (bubbleRefs.current[leftBubbles.length + idx] = el)
              }
              className="absolute z-10 flex items-center justify-center"
              style={{
                left: `calc(50% + ${b.x}px)`,
                top: `calc(50% + ${b.y}px)`,
                transform: "translate(-50%, -50%)"
              }}
            >
              <button
                className="rounded-full font-semibold whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
                style={{
                  padding: "6px 16px",
                  fontSize: 11,
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
