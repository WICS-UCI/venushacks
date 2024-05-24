import React from "react";
import "./Footer.scss";

function Footer() {
	return (
		<footer id="footer">
			<a href="mailto:venushacks.uci@gmail.com" target="_top">
				<i className="fa fa-envelope"></i>
			</a>
			<a
				href="https://www.tiktok.com/@venushacksuci?_t=8mcE7XPT13b&_r=1"
				target="_blank"
				rel="noopener noreferrer"
			>
				<i className="fa-brands fa-tiktok"></i>
			</a>
			<a
				href="https://www.instagram.com/venushacksuci"
				target="_blank"
				rel="noopener noreferrer"
			>
				<i className="fa-brands fa-instagram"></i>
			</a>
		</footer>
	);
}

export default Footer;
