"use client";

import * as NavMenu from "@radix-ui/react-navigation-menu";
import { PropsWithChildren } from "react";

import styles from "./Navbar.module.scss";
import NavLinkItem from "./NavbarHelpers";

export default function BaseNavbar({ children }: PropsWithChildren) {
	return (
		<NavMenu.Root
			className={`hidden md:flex fixed top-6  z-40 justify-between`}
		>
			<div className="flex w-full max-w-5xl items-center px-6 gap-8">
				<div className={styles.navMenuListWrapper}>
					<NavMenu.List className={styles.navMenuList}>
						<NavLinkItem href="/#home">Home</NavLinkItem>
						<NavLinkItem href="/#about">About</NavLinkItem>
						<NavLinkItem href="/#faqs">FAQs</NavLinkItem>
						{/* <NavLinkItem href="/#partners">Partners</NavLinkItem> */}
						<NavLinkItem href="/#prizes">Prizes</NavLinkItem>
						<NavLinkItem href="/#team">Team</NavLinkItem>
					</NavMenu.List>
					<NavMenu.Indicator className={styles.navMenuIndicator} />
				</div>

				<div className="">{children}</div>
			</div>
		</NavMenu.Root>
	);
}
