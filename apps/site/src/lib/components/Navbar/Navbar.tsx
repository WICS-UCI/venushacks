"use client";

import Button from "@/lib/components/Button/Button";
import { Identity } from "@/lib/utils/getUserIdentity";
import BaseNavbar from "./BaseNavbar";

interface NavbarProps {
	identity: Identity;
}

export default function Navbar({ identity }: NavbarProps) {
	const isLoggedIn = !!identity && identity.uid !== null;

	return (
		<div className="w-full flex justify-center">
			<BaseNavbar>
				<div className="flex flex-row gap-4">
					<Button
						text="Schedule"
						href="/schedule"
						usePrefetch={false}
						isNavButton
						className="!border-[#D77676] !bg-[#F9C4C4] !text-[#D77676]"
					/>

					{isLoggedIn ? (
						<Button
							text="Portal"
							href="/portal"
							usePrefetch={false}
							isNavButton
						/>
					) : (
						<Button
							text="Apply"
							href="/choose-role"
							usePrefetch={false}
							isNavButton
						/>
					)}
				</div>
			</BaseNavbar>

			<div className="fixed top-4 right-4 z-40 md:hidden">
				{isLoggedIn ? (
					<Button
						text="Portal"
						href="/portal"
						usePrefetch={false}
						isNavButton
					/>
				) : (
					<Button
						text="Apply"
						href="/choose-role"
						usePrefetch={false}
						isNavButton
					/>
				)}
			</div>
		</div>
	);
}
