import Image from "next/image";

import InstagramImage from "@/assets/icons/instagram.svg";
import LinkedInImage from "@/assets/icons/linkedin.svg";
import TikTokImage from "@/assets/icons/tiktok.svg";
import MailImage from "@/assets/icons/mail.svg";

export default function SocialLinks() {
	return (
		<div className="fixed top-4 right-4 md:top-8 md:right-8 z-10">
            <ul className="flex items-center gap-2 md:gap-4 md:gap-3">
                <li>
                    <a
                        href="https://www.tiktok.com/@venushacksuci"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="VenusHacks on Tiktok"
                        className="flex h-11 w-11 items-center justify-center"
                    >
                        {/* TIKTOK SVG */}
                        <Image
                            src={TikTokImage}
                            alt=""
                            className="h-6 w-6 md:h-8 md:w-8"
                        />
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.instagram.com/venushacksuci/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="VenusHacks on Instagram"
                        className="flex h-11 w-11 items-center justify-center"
                    >
                        {/* INSTAGRAM SVG */}
                        <Image
                            src={InstagramImage}
                            alt=""
                            className="h-7 w-7 md:h-9 md:w-9"
                        />
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.linkedin.com/company/venushacks/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="VenusHacks on LinkedIn"
                        className="flex h-11 w-11 items-center justify-center"
                    >
                        {/* INSTAGRAM SVG */}
                        <Image
                            src={LinkedInImage}
                            alt=""
                            className="h-9 w-9 md:h-11 md:w-11"
                        />
                    </a>
                </li>
                <li>
                    <a
                        href="mailto:venushacks.uci@gmail.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Mail VenusHacks"
                        className="flex h-11 w-11 items-center justify-center"
                    >
                        {/* INSTAGRAM SVG */}
                        <Image src={MailImage} alt="" className="h-7 w-7 md:h-9 md:w-9" />
                    </a>
                </li>
            </ul>
        </div>
    )
}
