import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Title from "../title/Title";
import PrimaryButton from "../primary-button/PrimaryButton";

import "./Hero.scss";


const Hero = () => {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<section className="hero-container">
			{/* PARALLAX CORAL LAYERS */}
			<div
				id="coral1"
				style={{ transform: `translateY(${scrollY * 0.2}px)` }}
			/>
			<div
				id="coral2"
				style={{ transform: `translateY(${scrollY * 0.4}px)` }}
			/>
			<div
				id="coral3"
				style={{ transform: `translateY(${scrollY * 0.6}px)` }}
			/>
			<div
				id="coral4"
				style={{ transform: `translateY(${scrollY * 0.8}px)` }}
			/>

			<Container className="d-flex flex-column align-items-center">
				<Title />
				<div className="button-row">
					<PrimaryButton href="/apply" type="button">Apply Now</PrimaryButton>
					<PrimaryButton href="/sponsor" type="button">Sponsor Us</PrimaryButton>
				</div>
			</Container>
		</section>
	);
};

export default Hero;
