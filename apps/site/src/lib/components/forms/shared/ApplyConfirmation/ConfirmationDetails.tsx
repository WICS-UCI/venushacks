import Button from "@/lib/components/Button/Button";
import Link from "next/link";

interface ConfirmationDetailsProps {
	isLoggedIn: boolean;
	applicationURL: string;
	appDescription?: string;
	roleText: string;
	role: "Hacker" | "Mentor" | "Volunteer";
}

export default async function ConfirmationDetails({
	isLoggedIn,
	applicationURL,
	appDescription,
	roleText,
	role,
}: ConfirmationDetailsProps) {
	const otherRoles = ["Hacker", "Mentor", "Volunteer"].filter(
		(r) => r !== role,
	);
	return (
		<div className="flex flex-col items-center gap-8 px-4 py-6 mx-4 max-w-screen-lg md:p-6 md:px-10 md:py-8 border-[2px] md:border-[5px] border-[var(--color-white)] text-[var(--color-white)] bg-[var(--color-black)]">
			<h1 className="text-5xl text-center">Before Applying</h1>
			{appDescription && (
				<>
					<div>
						<p className="text-lg m-0 w-full">
							Details About the{" "}
							<strong className="text-[#FBA80A]">{role}</strong> Role:
						</p>

						{appDescription.split("\n").map((line, index) => (
							<p key={index} className="text-lg m-0 w-full">
								{line}
							</p>
						))}
					</div>
					<p className="text-lg m-0 w-full">
						<span className="text-[#FF2222]">IMPORTANT NOTE:</span> Please only
						apply if you are sure about your availability. In addition, there
						will be no travel reimbursements for this role.
					</p>

					<hr className="mt-5 w-full h-0.5 bg-[#432810]" />
				</>
			)}
			<p className="text-lg">
				By submitting an application for IrvineHacks 2025 as a{" "}
				<strong className="text-[#FBA80A]">{role}</strong>, I understand that
				IrvineHacks will take place in person during the day from January 24 to
				26, and that IrvineHacks will not be providing transportation or
				overnight accommodations. {roleText}
			</p>
			<s aria-hidden className="text-lg text-[#FF2222]">
				Applications are due on January 10th, 2025 at 11:59PM PST.
			</s>
			<strong className="text-lg text-[#FF2222]">
				Applications are due on January 12th, 2025 at 11:59PM PST.
			</strong>
			<Button
				className="text-2xl"
				text={isLoggedIn ? "Proceed to Application" : "Log in to Apply"}
				href={
					isLoggedIn
						? `${applicationURL}?prefaceAccepted=true`
						: `/login?${new URLSearchParams({ return_to: applicationURL })}`
				}
				isLightVersion
			/>

			<p>
				Interested in being a{" "}
				{otherRoles.map((role, index) => (
					<span key={role}>
						<Link
							href={role === "Hacker" ? `/apply` : `/${role.toLowerCase()}`}
							className="text-[#FBA80A] underline"
						>
							{role}
						</Link>
						{index < otherRoles.length - 1 ? " or " : " "}
					</span>
				))}
				instead?
			</p>
		</div>
	);
}
