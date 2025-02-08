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
import instaIcon from "/assets/images/instagram_icon.svg";
import emailIcon from "/assets/images/email_icon.svg";
import tiktokIcon from "/assets/images/tikok_icon.svg";

// import vhRocketship from "/assets/images/rocketship.png";
import "./Nav.scss";

const NavLink = ({ url, text, img, desc, reduceMotion, isMobile }) => (
	<Link className="nav-link" to={url}>
		<motion.span>
			{text}
			<img className="nav-icon" src={img} alt={desc}/>
		</motion.span>
	</Link>
);

const NavLinks = ({ reduceMotion, showDivider, isMobile }) => (
	<>
		<NavLink
			url="https://www.instagram.com/venushacksuci/"
			desc="Instagram"
			img={instaIcon}
			{...{ isMobile, reduceMotion }}
		/>
		<NavLink
			url="https://www.tiktok.com/@venushacksuci"
			desc="TikTok"
			img={tiktokIcon}
			{...{ isMobile, reduceMotion }}
		/>
		<NavLink
			url="mailto:venushacks.uci@gmail.com"
			desc="Email"
			img={emailIcon}
			{...{ isMobile, reduceMotion }}
		/>
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

	const [hover, setHover] = useState(false);

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
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
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
							/>
						</Link>
					)}
					{hover?(
						<>
						{!isMobile? (
							<div className="bckgrd"><NavLinks showDivider={true} {...{ isMobile, reduceMotion }} /></div>
						) : ( 
							<>
								<div className="bckgrd">
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
								</div>
							</>
						)}
						</>
					):(null)}
					
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default Nav;
