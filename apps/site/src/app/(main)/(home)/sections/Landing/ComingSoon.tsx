"use client";

import styles from "./Landing.module.css";

const ComingSoon = () => {

	return (
		<>
			<div className="min-h-screen flex items-center justify-center">
                <h1 className={`${styles.headingDropShadow} font-heading text-4xl md:text-7xl lg:text-5xl mb-12 text-center`}>COMING SOON</h1>
            </div>
		</>
	);
};

export default ComingSoon;
