"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

/* 100% RESPONSIVE CLOUD POSITIONS */
const bubbles = [
  { text: "Protein",        left: "20%", top: "10%",  w: 110, h: 60 },
  { text: "Minerals",       left: "80%", top: "10%",  w: 110, h: 60 },

  { text: "Calcium",        left: "10%", top: "45%",  w: 135, h: 70 },
  { text: "Vitamin D",      left: "90%", top: "45%",  w: 135, h: 70 },

  { text: "Healthy Bones",  left: "22%", top: "82%",  w: 180, h: 85 },
  { text: "Good Digestion", left: "78%", top: "82%",  w: 190, h: 85 }
];

export default function MilkPacketInfographic() {
  const imageRef = useRef(null);
  const bubbleRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.85, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45 }
    );

    tl.fromTo(
      bubbleRefs.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.08 },
      "-=0.2"
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
          paddingLeft: 16,
          paddingRight: 16
        }}
      >
        <h1
          className="font-extrabold text-center"
          style={{ fontSize: 30, lineHeight: "32px", color: "#1670aa" }}
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

        {/* CENTER AREA - RESPONSIVE */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: "100%",
            maxWidth: 420,
            height: 350,
          }}
        >
          {/* MILK PACK */}
          <div ref={imageRef} className="z-20">
            <Image
              src="/milkarm.png"
              alt="Agasthya A2 Buffalo Milk"
              width={250}
              height={250}
              className="object-contain select-none"
              draggable={false}
            />
          </div>

          {/* CLOUD BUBBLES */}
          {bubbles.map((b, i) => (
            <div
              key={b.text}
              ref={(el) => (bubbleRefs.current[i] = el)}
              className="absolute z-10 flex items-center justify-center"
              style={{
                left: b.left,
                top: b.top,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="relative flex items-center justify-center"
                style={{ width: b.w, height: b.h }}
              >
                <Image
                  src="/cloud.svg"
                  alt=""
                  fill
                  className="object-contain select-none"
                  draggable={false}
                />
                <span
                  className="absolute text-center font-semibold"
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
