"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import ComingSoonBackground from "../(home)/sections/Landing/ComingSoonBackground";
import ApplicantPortalBackground from "@/lib/components/ApplicantPortalBackground/ApplicantPortalBackground";
import logo from "./assets/vh-logo.png";

function countdown(deadline: Date) {
    const deadlineTime = deadline.getTime();
    const now = new Date().getTime();
    const difference = deadlineTime - now;

    const hours = Math.floor((difference) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function Countdown(){
    const DEADLINE = new Date("May 17, 2026 13:00:00");
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
    const interval = setInterval(() => {
      setTime(countdown(DEADLINE));
    }, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  });

  return(
    <>
        <div className="absolute z-10 right-5 top-5">
            <Image src={logo} alt="logo" width="100" height="100"/>
        </div>
        <div className="absolute z-10 left-[50%] top-[15%] -translate-x-1/2 -translate-y-1/2
                        bg-[#D77676] py-2 px-16 rounded-full border-[#B25B5B] border-4">
            <h2 className="font-torus text-[40px] text-white text-center tracking-[10%]">Hacking ends in...</h2>
        </div>
        <div className="absolute z-10 left-[50%] top-[37%] -translate-x-1/2 -translate-y-1/2">
            <h2 className="font-sniglet font-bold text-[200px] text-[#2F3248]">
                {time}
            </h2>
        </div>
        <ComingSoonBackground/>
        <ApplicantPortalBackground />
    </>
  );
}