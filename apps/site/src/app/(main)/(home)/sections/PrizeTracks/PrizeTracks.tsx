"use client";

import Image from "next/image";
import { useState } from "react";
import flower from "./assets/flower.svg";
import grass from "./assets/grass.svg";
import tech_field_logo from "./assets/tech_field_logo.svg";
import accessible_logo from "./assets/accessible_logo.svg";
import heart_health_logo from "./assets/heart_health_logo.svg";
import picnic_bg from "./assets/picnic_bg.svg";
import headphones from "./assets/headphones.svg";
import keyboard from "./assets/keyboard.svg";
import ipad_amazon from "./assets/ipad_amazon.svg";
import arrow from "./assets/arrow.svg";

const tracks = [
  {
    title: "Improving Access to the Tech Field",
    icon: tech_field_logo,
    front:
      "This track is about breaking down structural barriers in tech and expanding access to education, careers, communities for underrepresented and nontraditional groups.",
    back: "4x Sony Headphones",
    prize: headphones,
    prizeClassName: "w-52 h-auto mt-5",
    prizeStyle: {},
    link: "https://drive.google.com/file/d/13VLlp0vvAPJCjg3-Uxk8palsQLW8vyKQ/view?usp=sharing",
  },
  {
    title: "Accessible, Equitable, & Inclusive Tech",
    icon: accessible_logo,
    front:
      "This track is about redesigning technology to better serve diverse and historically excluded users by challenging biased assumptions in existing systems.",
    back: "4x HHKB Studio Keyboards",
    prize: keyboard,
    prizeClassName: "h-auto mt-5",
    prizeStyle: { width: "100%", minWidth: "280px" },
    link: "https://drive.google.com/file/d/18D1hP_wlYVibzl9jnrVyveBh9O5lDwzF/view?usp=sharing",
  },
  {
    title: "Heart Health at Warp Speed",
    icon: heart_health_logo,
    front:
      "This track is about creating solutions that use pregnancy and postpartum care as opportunities to improve and protect women's long-term heart health.",
    back: "4x iPad + $100 Amazon Gift Cards",
    prize: ipad_amazon,
    prizeClassName: "w-64 h-auto mt-5",
    prizeStyle: {},
    link: null,
  },
];

const renderMixedText = (text: string) =>
  text.split("").map((char, index) => {
    const isSymbolOrNumber = /[^a-zA-Z\s]/.test(char);
    return (
      <span key={index} className={isSymbolOrNumber ? "font-sniglet" : ""}>
        {char}
      </span>
    );
  });

const PrizeTracks = () => {
  // Track which cards are flipped (for touch/mobile support)
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const toggleFlip = (index: number) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section className="w-full py-16 relative overflow-hidden">
      {/* Decorative flowers */}
      <div className="absolute left-[8%] top-8 w-10 h-10 opacity-90">
        <Image src={flower} alt="flower" />
      </div>
      <div className="absolute right-[6%] bottom-8 w-10 h-10 opacity-90">
        <Image src={flower} alt="flower" />
      </div>

      {/* Title */}
      <h2 className="font-bold text-[#2F3248] text-center mb-12 tracking-widest text-3xl sm:text-4xl md:text-5xl font-torus">
        Tracks <span className="font-sniglet">&</span> Prizes
      </h2>

      {/* Cards grid */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center md:items-stretch px-6 max-w-5xl mx-auto mb-10">
        {tracks.map((track, index) => {
          const isFlipped = flipped[index] ?? false;

          return (
            <div
              key={track.title}
              className="w-full max-w-sm md:w-80 lg:w-96 flex-shrink-0 cursor-pointer"
              style={{ perspective: "1000px" }}
              // Desktop: hover to flip
              onMouseEnter={() =>
                setFlipped((prev) => ({ ...prev, [index]: true }))
              }
              onMouseLeave={() =>
                setFlipped((prev) => ({ ...prev, [index]: false }))
              }
              // Mobile: tap to flip
              onClick={() => toggleFlip(index)}
            >
              {/* Flip container */}
              <div
                className="relative w-full transition-transform duration-700 ease-in-out"
                style={{
                  height: "500px",
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* FRONT */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    backgroundImage: `url(${picnic_bg.src})`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    padding: "15% 12%",
                  }}
                >
                  <div className="w-full flex justify-center">
                    <h3 className="text-[#BF6767] font-bold text-center text-xl md:text-[28px] leading-snug mb-4 font-torus max-w-[80%]">
                      {renderMixedText(track.title)}
                    </h3>
                  </div>

                  <Image
                    src={track.icon}
                    alt={track.title}
                    width={110}
                    height={110}
                  />

                  <p className="text-[#BB5D5D] text-sm md:text-[16px] text-center leading-relaxed mt-4 font-sniglet w-full max-w-[95%]">
                    {track.front}
                  </p>
                </div>

                {/* BACK */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    backgroundImage: `url(${picnic_bg.src})`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    padding: "15% 12%",
                  }}
                >
                  <div className="flex flex-col items-center gap-4">
                    <Image
                      src={track.prize}
                      alt={track.back}
                      width={500}
                      height={500}
                      className={track.prizeClassName}
                      style={track.prizeStyle}
                    />

                    <h3 className="text-[#BF6767] text-xl md:text-[28px] text-center leading-relaxed font-torus max-w-[95%]">
                      {renderMixedText(track.back)}
                    </h3>

                    {track.link ? (
                      <a
                        href={track.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#BB5D5D] text-[11px] md:text-[12px] leading-relaxed font-sniglet"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Example problem statements{" "}
                        <Image
                          src={arrow}
                          alt="arrow"
                          className="inline-block align-middle"
                        />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute left-[28%] text-4xl font-serif select-none">
        <Image src={grass} alt="grass" />
      </div>
    </section>
  );
};

export default PrizeTracks;