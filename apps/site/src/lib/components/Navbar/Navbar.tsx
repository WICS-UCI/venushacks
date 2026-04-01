"use client";

import Button from "@/lib/components/Button/Button";
import { Identity } from "@/lib/utils/getUserIdentity";
import BaseNavbar from "./BaseNavbar";

interface NavbarProps {
	identity: Identity;
}

export default function Navbar({ identity }: NavbarProps) {
	const { uid, status } = identity;
	const isLoggedIn = uid !== null;

	return (
		<>
			<BaseNavbar>
				{status !== null && (
					<Button
						text="Portal"
						href="/portal"
						usePrefetch={false}
						isNavButton
					/>
				)}
				{isLoggedIn ? (
					<Button
						text="Logout"
						href="/logout"
						usePrefetch={false}
						isNavButton
					/>
				) : (
					<Button text="Apply" href="/#apply" usePrefetch={false} isNavButton />
				)}
			</BaseNavbar>

			<div className="fixed top-4 right-4 z-40 md:hidden">
				{isLoggedIn ? (
					<Button
						text="Logout"
						href="/logout"
						usePrefetch={false}
						isNavButton
					/>
				) : (
					<Button text="Apply" href="/#apply" usePrefetch={false} isNavButton />
				)}
			</div>
		</>
	);
}
