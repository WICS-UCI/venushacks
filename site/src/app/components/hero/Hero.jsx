import { useEffect, useState } from "react";
import CoralParallaxSection from "../coral-parallax-section/CoralParallaxSection";


const Hero = () => {
	const [clientWidth, setClientWidth] = useState(window.innerWidth);
	const [clientHeight, setClientHeight] = useState(window.innerHeight);

	useEffect(() => {
		const handleResize = () => {
			setClientWidth(window.innerWidth);
			setClientHeight(window.innerHeight);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<CoralParallaxSection
			clientWidth={clientWidth}
			clientHeight={clientHeight}
		/>
	);
};

export default Hero;
