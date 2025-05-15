import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	motion,
	useMotionValueEvent,
	useReducedMotion,
	useScroll,
	AnimatePresence,
} from "framer-motion";

import vhLogo from "/assets/images/shell.svg";

import "./Nav.scss";

const NavLink = ({ url, text, img, desc, reduceMotion, isMobile }) => (
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
			<img className="nav-icon" src={img} alt={desc} />
		</motion.span>
	</Link>
);

const NavLinks = ({ reduceMotion, isMobile }) => (
	<>
		<NavLink url="/" text="Home" {...{ isMobile, reduceMotion }} />
		<NavLink url="/apply" text="Apply" {...{ isMobile, reduceMotion }} />
		<NavLink url="/schedule" text="Schedule" {...{ isMobile, reduceMotion }} />
		<NavLink
			url="/workshops"
			text="Workshops"
			{...{ isMobile, reduceMotion }}
		/>
		<NavLink url="/feedback" text="Feedback" {...{ isMobile, reduceMotion }} />
		<NavLink
			url="/report"
			text="Incident Form"
			{...{ isMobile, reduceMotion }}
		/>

		{/* <NavLink
			url="/resources"
			text="Resources"
			{...{ isMobile, reduceMotion }}
		/> */}
		{/* <NavLink url="/devpost" text="DevPost" {...{ isMobile, reduceMotion }} /> */}
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
									initial: { scale: 0.5 },
									animate: { scale: [null, 1.1, 0.8, 1.05, 1] },
									exit: { scale: 0.5 },
									transition: {
										duration: 1,
										times: [0.1, 0.11, 0.12, 0.2, 0.6, 0.7],
										damping: 15,
										restSpeed: 0.00001,
										mass: 0.9,
									},
								})}
							/>
						</Link>
					)}
					{isMobile ? (
						<div className={`bckgrd ${showDropdown && "open-bckgrd"}`}>
							<motion.span
								className={`nav-menu-span`}
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
								<div>
									<NavLinks {...{ isMobile, reduceMotion }} />
								</div>
							)}
						</div>
					) : (
						<div className="bckgrd">
							<NavLinks {...{ isMobile, reduceMotion }} />
						</div>
					)}
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default Nav;
