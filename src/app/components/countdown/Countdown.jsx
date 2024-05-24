import React, { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import FlipNumbers from "react-flip-numbers";

const Countdown = ({ date }) => {
  const getWinDims = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  };

  const [winDim, setWinDim] = useState(getWinDims());
  const [timer, setTimer] = useState("00:00:00");
  const [hasTimerInit, setHasTimerInit] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const remainingTime = () => {
      const total = Date.parse(date) - Date.now();
      return {
        total,
        seconds: Math.floor((total / 1000) % 60),
        minutes: Math.floor((total / 1000 / 60) % 60),
        hours: Math.floor(total / 1000 / 60 / 60),
        // days: Math.floor(total / 1000 / 60 / 60 / 24),
      };
    };

    const startTime = () => {
      // const { total, seconds, minutes, hours, days } = remainingTime();
      const { total, seconds, minutes, hours } = remainingTime();
      if (total >= 0) {
        setTimer(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }
      setHasTimerInit(true);
    };

    if (ref.current) {
      clearInterval(ref.current);
    }

    const id = setInterval(() => startTime(), 1000);
    ref.current = id;
  }, [date]);

  useEffect(() => {
    const handleResize = () => setWinDim(getWinDims());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const timerExpired = hasTimerInit && timer === "00:00:00";
  const isDesktop = winDim.width > 1000;
  // VH 2024 colors
  const confettiColors = ['#ee99a0', '#ffc999', '#070024', '#322660', '#a8acf9'];
  return (
    <>
      {timerExpired && (
        <Confetti
          width={isDesktop ? 3000 : 800}
          height={isDesktop ? 400 : 300}
          numberOfPieces={50}
          tweenDuration={2}
          colors={confettiColors}
        />
      )}
      <FlipNumbers
        play
        numbers={timer}
        color="#322660"
        width={isDesktop ? 40 : 30}
        height={isDesktop ? 50 : 30}
        nonNumberStyle={{
          fontSize: isDesktop ? "40px" : "30px"
        }}
        numberStyles={{
          textAlign: "left",
          fontSize: "30px",
        }}
      />
    </>
  );
};

export default Countdown;
