import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	motion,
	useMotionValueEvent,
	useReducedMotion,
	useScroll,
	AnimatePresence,
} from "framer-motion";

import vhLogo from "/assets/images/icon.png";
import vhRocketship from "/assets/images/rocketship.png";
import "./Nav.scss";

const NavLink = ({ url, text, reduceMotion, isMobile }) => (
	<Link className="nav-link" to={url}>
		<motion.span
			{...(!reduceMotion && {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				transition: { delay: isMobile ? 0 : 0.6, duration: 0.2 },
			})}
		>
			{text}
		</motion.span>
	</Link>
);

const NavLinks = ({ reduceMotion, showDivider, isMobile }) => (
	<>
		<NavLink url="/" text="Home" {...{ isMobile, reduceMotion }} />
		<NavLink url="/schedule" text="Schedule" {...{ isMobile, reduceMotion }} />
		<NavLink
			url="/resources"
			text="Resources"
			{...{ isMobile, reduceMotion }}
		/>
		<NavLink
			url="/workshops"
			text="Workshops"
			{...{ isMobile, reduceMotion }}
		/>
		{showDivider && (
			<motion.span
				className="nav-link-divider"
				{...(!reduceMotion && {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
					transition: { delay: isMobile ? 0 : 0.6, duration: 0.2 },
				})}
			/>
		)}
		<NavLink
			url="/report"
			text="Incident Form"
			{...{ isMobile, reduceMotion }}
		/>
		<NavLink url="/devpost" text="Devpost" {...{ isMobile, reduceMotion }} />
		{/* <NavLink url="/midway" text="Midway Check-in" {...{ isMobile, reduceMotion }} /> */}
		{/* <NavLink url="/hackers-choice" text="Hacker's Choice" {...{ isMobile, reduceMotion }} /> */}
	</>
);

const Nav = () => {
	const [scrollPct, setScrollPct] = useState(0);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const isMobile = screenWidth < 900;
	const [showDropdown, setShowDropdown] = useState(false);
	const toggleShowDropdown = () => setShowDropdown(!showDropdown);

	const { pathname } = useLocation();
	const isHomepage = pathname == "/";
	const reduceMotion = useReducedMotion();
	const { scrollYProgress } = useScroll();

	window.addEventListener("resize", () => setScreenWidth(window.innerWidth));
	useMotionValueEvent(scrollYProgress, "change", (latest) =>
		setScrollPct(latest)
	);

	return (
		<AnimatePresence mode="sync">
			<motion.div
				className="nav-container"
				{...(!reduceMotion && {
					initial: { y: 0 },
					animate: { y: 0 },
					exit: { y: -100 },
					transition: { type: "spring", duration: 0.1, damping: 15, mass: 0.9 },
				})}
				{...(isMobile && {
					onClick: () => toggleShowDropdown(),
				})}
			>
				<motion.div
					className="nav-links-container"
					{...(!reduceMotion && {
						initial: {
							width: 0,
							paddingLeft: 0,
							paddingRight: 0,
							paddingTop: 0,
							marginLeft: "25%",
						},
						animate: {
							width: "80%",
							paddingLeft: "10%",
							paddingRight: "4.5%",
							paddingTop: "14px",
							marginLeft: "10%",
						},
						exit: {
							width: 0,
							paddingLeft: 0,
							paddingRight: 0,
							paddingTop: 0,
							marginLeft: "25%",
						},
						transition: {
							type: "spring",
							delay: 0.4,
							duration: 0.2,
							damping: 18,
						},
					})}
					{...(showDropdown && { style: { height: "auto" } })}
				>
					{!showDropdown && (
						<Link
							className="nav-vh-logo-link"
							to="/"
							{...(showDropdown && { style: { top: "-10%" } })}
						>
							<motion.img
								className="nav-vh-logo"
								src={vhLogo}
								{...(!reduceMotion && {
									initial: { rotate: -180 },
									animate: { rotate: 0 },
									exit: { rotate: 180 },
									transition: {
										duration: 0.3,
										damping: 15,
										restSpeed: 0.00001,
										mass: 0.9,
									},
								})}
							/>
						</Link>
					)}
					{!showDropdown && (
						<motion.img
							className="nav-scroll-progressor"
							src={vhRocketship}
							style={{
								rotate: 90,
								translateX: reduceMotion
									? 0
									: `${scrollPct * 1.5 * window.innerWidth}%`,
							}}
						/>
					)}
					{!isMobile ? (
						<NavLinks showDivider={true} {...{ isMobile, reduceMotion }} />
					) : (
						<>
							<motion.span
								className={`nav-menu-span ${!showDropdown && "menu-icon"}`}
								{...(!reduceMotion && {
									initial: { opacity: 0 },
									animate: { opacity: 1 },
									exit: { opacity: 0 },
									transition: { delay: 0.5, duration: 0.2 },
								})}
							>
								{showDropdown ? "x" : "≡"}
							</motion.span>
							{showDropdown && (
								<NavLinks showDivider={false} {...{ isMobile, reduceMotion }} />
							)}
						</>
					)}
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default Nav;
