import Image from "next/image";

const leftBubbles = ["Protein", "Minerals", "Calcium"];
const rightBubbles = ["Vitamin D", "Healthy Bones", "Good Digestion"];

export default function MilkPacketInfographic() {
  return (
    <div className="relative w-full py-12 flex items-center justify-center">

      {/* LEFT BUBBLES */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-8">
        {leftBubbles.map((text, index) => (
          <span
            key={text}
            className={`
              px-6 py-3 rounded-full border border-blue-300 bg-white 
              shadow-md text-blue-700 font-semibold transition-all
              hover:shadow-xl hover:scale-105
              ${
                index === 0 ? "ml-8" :
                index === 2 ? "ml-8" :
                "ml-0"
              }
            `}
          >
            {text}
          </span>
        ))}
      </div>

      {/* RIGHT BUBBLES */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-8">
        {rightBubbles.map((text, index) => (
          <span
            key={text}
            className={`
              px-6 py-3 rounded-full border border-blue-300 bg-white 
              shadow-md text-blue-700 font-semibold transition-all
              hover:shadow-xl hover:scale-105
              ${
                index === 0 ? "mr-8" :
                index === 2 ? "mr-8" :
                "mr-0"
              }
            `}
          >
            {text}
          </span>
        ))}
      </div>

      {/* CENTER IMAGE */}
      <div className="relative z-20 flex items-center justify-center">
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

    </div>
  );
}
