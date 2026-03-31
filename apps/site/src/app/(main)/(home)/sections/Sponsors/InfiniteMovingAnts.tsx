"use client";

import React, { useEffect, useState } from "react";
import box from "@/assets/images/center_chat_box.svg";
import boxBG from "@/assets/images/center_chat_box_bg.svg";
import Image from "next/image";
import blueberry from "./assets/blueberry_ant.svg";
import apple from "./assets/apple_ant.svg";
import melon from "./assets/melon_ant.svg";
import orange from "./assets/orange_ant.svg";
import pineapple from "./assets/pineapple_ant.svg";

const sponsorGraphics = [melon, orange, pineapple];

export const InfiniteMovingAnts = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
}: {
    items: string[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
        let iterations = 0;
        const maxIterations = 10;  //prevent too many loops that'll crash the site
        if (!containerRef.current || !scrollerRef.current) return;

        // Clone items multiple times to ensure smooth infinite scroll
        const scroller = scrollerRef.current;
        const children = Array.from(scroller.children);
        const containerWidth = containerRef.current.offsetWidth;
        let totalWidth = scroller.scrollWidth;

        // Clone until scroller is at least 2x container width
        while (totalWidth < containerWidth * 2 && iterations < maxIterations) {
            children.forEach((child) =>
                scroller.appendChild(child.cloneNode(true))
            );
            totalWidth = scroller.scrollWidth;
            iterations++;
        }

        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setStart(true);
            }
            });
        },
        { threshold: 0.1 }
        );

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [items]);

    const duration =
        speed === "fast" ? "30s" : speed === "normal" ? "150s" : "650s";

    return (
        <div
            ref={containerRef}
            className="scroller relative z-[20]"
            style={
                {
                    "--duration": duration,
                } as React.CSSProperties
            }
        >
            <ul
                key={duration}
                ref={scrollerRef}
                className={`flex min-w-full shrink-0  w-max flex-nowrap items-center justify-center ${
                    start ? "animate-scroll" : ""
                } ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""} ${
                    direction === "right" ? "[animation-direction:reverse]" : ""
                }`
            }
            >
                {items.map((item, idx) => {
                    const graphic = sponsorGraphics[idx % sponsorGraphics.length]; // cycle through graphics
                    return (
                        <li
                            key={`${item}-${idx}`}
                            className="relative flex transition-transform hover:scale-105"
                        >
                            <a href={item} target="_blank" className="w-full h-full">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <h2 className={"absolute text-black z-[20] text-center w-[20%] top-[50%] left-[40%]"}>
                                    {item}
                                </h2>
                                <div className={"aspect-[6/7.5] flex items-end justify-center"}>
                                    <Image
                                        src={graphic}
                                        alt={item}
                                        className="w-[90%] max-h-full"
                                    />
                                </div>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
