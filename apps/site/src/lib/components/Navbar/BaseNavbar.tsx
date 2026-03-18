"use client";

import * as NavMenu from "@radix-ui/react-navigation-menu";
import { PropsWithChildren, useEffect, useState } from "react";

import HackLogo from "@/lib/components/HackLogo/HackLogo";
import NavLinkItem from "./NavbarHelpers";

import styles from "./Navbar.module.scss";

export default function BaseNavbar({ children }: PropsWithChildren) {
	const [hasScrolled, setHasScrolled] = useState(false);

	useEffect(() => {
		const scrollHandler = () => {
			setHasScrolled(window.scrollY !== 0);
		};

		window.addEventListener("scroll", scrollHandler);

		return () => window.removeEventListener("scroll", scrollHandler);
	}, []);

	return (
		<NavMenu.Root
			className={`hidden md:flex fixed top-6 left-0 right-0 z-40 justify-center`}
		>
			<div className="flex w-full max-w-5xl items-center px-6 gap-6">
				<NavMenu.List>
					<NavLinkItem href="/#home">
						<HackLogo />
					</NavLinkItem>
				</NavMenu.List>

				<div className={styles.navMenuListWrapper}>
					<NavMenu.List className={styles.navMenuList}>
						<NavLinkItem href="/#home">Home</NavLinkItem>
						<NavLinkItem href="/#about">About</NavLinkItem>
						<NavLinkItem href="/#faqs">FAQs</NavLinkItem>
						<NavLinkItem href="/#sponsors">Sponsors</NavLinkItem>
						<NavLinkItem href="/#partners">Partners</NavLinkItem>
						<NavLinkItem href="/#team">Team</NavLinkItem>
					</NavMenu.List>
					<NavMenu.Indicator className={styles.navMenuIndicator} />
				</div>

				<div className="ml-auto">{children}</div>
			</div>
		</NavMenu.Root>
	);
}

