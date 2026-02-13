"use client";

import {useEffect } from "react";
import Image from "next/image";

import LandingBackgroundGrass from "@/assets/backgrounds/coming-soon-background-grass.svg";
import CloudGroup from "@/assets/backgrounds/coming-soon-clouds.svg";

import styles from "./Landing.module.css";

const ComingSoon = () => {
  useEffect(() => {
    // Disable scroll while this component is mounted
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      // Restore original scroll when component unmounts
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className="flex items-center justify-center h-full w-full"
        style={{ backgroundColor: "#B2EEE7" }}
      >
        <div className={styles.cloudsWrapper}>
          <div className={styles.cloudTrack}>
            <Image src={CloudGroup} alt="Clouds" className={styles.cloudGroup} />
            <Image src={CloudGroup} alt="Clouds" className={styles.cloudGroup} />
          </div>
        </div>

        <h1
          className={`${styles.headingDropShadow} font-heading text-4xl md:text-7xl lg:text-5xl mb-12 text-center relative z-10`}
        >
          COMING SOON
        </h1>
      </div>

      <Image
        src={LandingBackgroundGrass}
        alt="Landing Background Grass"
        className={styles.landingImage}
        style={{ bottom: "-5%" }}
      />
    </div>
  );
};

export default ComingSoon;
