"use client";

import Image from "next/image";

import { comfortaa } from "@/app/fonts";

import { VenusButton } from "@/app/components";

import vhTitle from "@/assets/images/titles/vh-title-launch.svg";
import "./Home.scss";

const VH_DATE = "May 24 - 26, 2024";
// const VH_DATE = "Coming Soon!";

const Home = () => {
	return (
		<div className="Home">
			{/* HERO **********************/}
			<section id="hero">
				<div id="astronaut-animation">
					{/* These assets are a background of a div instead of imgs to prevent
					them from being able to be saved to camera roll on iOS */}
					<div id="boba" />
					<div id="astronaut" />
					<div id="laptop" />
					<div id="shiba-inu" />
				</div>

				<div id="hero-right">
					<Image
						src={vhTitle}
						alt="VenusHacks Title Logo"
						id="venushacks-title"
					/>
					<h4 className={comfortaa.variable} id="date">
						{VH_DATE}
					</h4>
					<p id="tagline">UC Irvine&apos;s largest women-centric hackathon</p>
					<p id="apps">Apps are now open!</p>
					<VenusButton text="Hacker" url="/apply" />
					<VenusButton text="Volunteer" url="/volunteer" />
				</div>
			</section>
		</div>
	);
};

export default Home;
