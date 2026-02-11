"use client";

import { useRef } from "react";
import Image from "next/image";

import LandingBackgroundGrass from "@/assets/backgrounds/coming-soon-background-grass.svg";
import CloudGroup from "@/assets/backgrounds/coming-soon-cloud-group.svg";

import hasDeadlinePassed from "@/lib/utils/hasDeadlinePassed";


import styles from "./Landing.module.css";

const ComingSoon = () => {
  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#B2EEE7' }}
      >
		<div className={styles.cloudsWrapper}>
		<Image
			src={CloudGroup}
			alt="Clouds"
			className={styles.cloudGroup}
			width={1600}   // adjust width as needed
			height={400}  // adjust height as needed
			priority
		/>
		</div>
        <h1 className={`${styles.headingDropShadow} font-heading text-4xl md:text-7xl lg:text-5xl mb-12 text-center`}>
          COMING SOON
        </h1>
      </div>

      <Image
        src={LandingBackgroundGrass}
        alt="Landing Background Grass"
        className={styles.landingImage}
      />
    </>
  );
};

export default ComingSoon;
