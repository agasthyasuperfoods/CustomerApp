"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

/* Clouds around the pack: top, sides, bottom */
const bubbles = [
  // TOP LEFT / TOP RIGHT
  { text: "Protein",        x: -120, y: -120, w: 140, h: 70 },
  { text: "Minerals",       x:  120, y: -120, w: 140, h: 70 },

  // MID LEFT / MID RIGHT
  { text: "Calcium",        x: -170, y:  -20, w: 150, h: 72 },
  { text: "Vitamin D",      x:  170, y:  -20, w: 150, h: 72 },

  // BOTTOM LEFT / BOTTOM RIGHT – wider clouds
  { text: "Healthy Bones",  x: -120, y: 110, w: 210, h: 100 },
  { text: "Good Digestion", x:  120, y: 110, w: 240, h: 100 }
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

    return () => tl.kill();
  }, []);

  return (
    <div className="mx-2 rounded-xl shadow-lg overflow-hidden">
      <div
        className="flex flex-col items-center"
        style={{
          backgroundColor: "#c7ecff",
          paddingTop: 32,
          paddingBottom: 40,
          paddingLeft: 20,
          paddingRight: 20
        }}
      >
        <h1
          className="font-extrabold text-center"
          style={{ fontSize: 35, lineHeight: "26px", color: "#1670aa" }}
        >
          Power in Every Glass
        </h1>

        <p
          className="text-center mt-2 mb-6"
          style={{ fontSize: 13, lineHeight: "18px", color: "#1670aa" }}
        >
          Rich in protein, minerals and calcium to support strong bones and
          better digestion.
        </p>

        {/* Center area */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: 420, maxWidth: "100%", height: 340 }}
        >
          {/* Center pack */}
          <div ref={imageRef} className="z-20">
            <Image
              src="/milkarm.png"
              alt="Agasthya A2 Buffalo Milk"
              width={260}
              height={260}
              className="object-contain select-none"
              draggable={false}
              priority
            />
          </div>

          {/* Clouds all around */}
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
              <div
                className="relative flex items-center justify-center"
                style={{ width: b.w, height: b.h }}
              >
                <Image
                  src="/cloud.svg"   // your single cloud SVG with transparent bg
                  alt=""
                  fill
                  className="object-contain select-none"
                  draggable={false}
                />
                <span
                  className="absolute px-3 text-center font-semibold"
                  style={{ fontSize: 11, color: "#1670aa" }}
                >
                  {b.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
