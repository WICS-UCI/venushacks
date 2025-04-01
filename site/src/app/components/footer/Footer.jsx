import React from "react";

import hackIcon from "/assets/images/hackatucilogo_icon.png";
import wicsIcon from "/assets/images/wicslogo_icon.png";
import heartIcon from "/assets/images/heart.svg";
import emailIcon from "/assets/images/email_icon.svg";

import "./Footer.scss";

function Footer() {
	return (
		<footer id="footer">
			<div className="msg">
				Made with <img src={heartIcon} id="love" alt="love"></img> by VenusHacks
				Organizers
			</div>
			<div className="logos">
				<a
					href="https://hack.ics.uci.edu/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={hackIcon} alt="Hack at UCI Logo"></img>
				</a>
				<a
					href="https://wics.ics.uci.edu/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={wicsIcon} alt="WICS Logo"></img>
				</a>
				<div className="divider"></div>
				<a
					href="https://www.instagram.com/venushacksuci"
					target="_blank"
					rel="noopener noreferrer"
				>
					<i className="fa-brands fa-instagram"></i>
				</a>
				<a
					href="https://www.tiktok.com/@venushacksuci"
					target="_blank"
					rel="noopener noreferrer"
				>
					<i className="fa-brands fa-tiktok"></i>
				</a>
				<a
					href="https://www.linkedin.com/company/venushacks/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<i className="fa-brands fa-linkedin"></i>
				</a>
				<a href="mailto:venushacks.uci@gmail.com" target="_top">
					<img id="color-change" src={emailIcon} alt="email"></img>
				</a>
			</div>
		</footer>
	);
}

export default Footer;
