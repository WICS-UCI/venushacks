import Image from "next/image";
import styles from "./Footer.module.scss";

import TikTokImage from "@/assets/icons/tiktok.svg";
import InstagramImage from "@/assets/icons/instagram.svg";
import LinkedInImage from "@/assets/icons/linkedin.svg";
import MailImage from "@/assets/icons/mail.svg";
import HeartImage from "@/assets/icons/heart.svg";

const socialLinks = [
	{
		href: "https://www.tiktok.com/@venushacksuci",
		label: "VenusHacks on TikTok",
		src: TikTokImage,
		className: "h-6 w-6 md:h-8 md:w-8",
	},
	{
		href: "https://www.instagram.com/venushacksuci/",
		label: "VenusHacks on Instagram",
		src: InstagramImage,
		className: "h-7 w-7 md:h-9 md:w-9",
	},
	{
		href: "https://www.linkedin.com/company/venushacks/",
		label: "VenusHacks on LinkedIn",
		src: LinkedInImage,
		className: "h-8 w-8 md:h-11 md:w-11",
	},
	{
		href: "mailto:venushacks.uci@gmail.com",
		label: "Email VenusHacks",
		src: MailImage,
		className: "h-7 w-7 md:h-10 md:w-10",
	},
];

const creamFilter =
	"brightness(0) saturate(100%) invert(93%) sepia(10%) saturate(400%) hue-rotate(330deg) brightness(105%)";

const Footer = () => {
	return (
		<footer
			className={`${styles.footer} w-full`}
			style={{ backgroundColor: "#2C4725" }}
		>
			<div className="mx-auto w-full max-w-screen-2xl px-6 md:px-10 pt-8 pb-5 md:py-6">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
					{/* Left: Made with text */}
					<div className="flex flex-row items-center justify-center md:justify-start">
						<p
							style={{
								color: "#F2E5D4",
								fontFamily: "'Torus Pro', sans-serif",
								fontWeight: 700,
								fontSize: "clamp(14px, 2.5vw, 18px)",
								lineHeight: "100%",
								letterSpacing: "0.2em",
								margin: 0,
								whiteSpace: "nowrap",
							}}
						>
							Made with
						</p>
						<Image
							src={HeartImage}
							alt="Heart icon"
							width={14}
							height={14}
							style={{
								filter: creamFilter,
								display: "block",
								position: "relative",
								top: "1px",
								marginLeft: "6px",
								marginRight: "9px",
							}}
						/>
						<p
							style={{
								color: "#F2E5D4",
								fontFamily: "'Torus Pro', sans-serif",
								fontWeight: 700,
								fontSize: "clamp(14px, 2.5vw, 18px)",
								lineHeight: "100%",
								letterSpacing: "0.2em",
								margin: 0,
								whiteSpace: "nowrap",
							}}
						>
							by VenusHacks Organizers
						</p>
					</div>
					{/* Right: Social media links */}
					<ul
						className="flex items-center justify-center md:justify-end list-none p-0 m-0"
						style={{ gap: "clamp(4px, 1.5vw, 8px)" }}
					>
						{socialLinks.map(({ href, label, src, className }) => (
							<li key={label}>
								<a
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={label}
									className="flex h-11 w-11 items-center justify-center transition-opacity"
									style={{ opacity: 0.85 }}
								>
									<Image
										src={src}
										alt=""
										className={className}
										style={{ filter: creamFilter }}
									/>
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
