import Image from "next/image";
import LinkedInImage from "@/assets/images/linkedin.png";
import hackerSprite from "@/assets/images/volunteer_sprite.png";

interface OrganizerCardProps {
	name: string;
	role: string;
	department: string;
	displayDepartment?: string;
	image?: string;
	link?: string;
}

function splitName(name: string): [string, string] {
	const words = name.trim().split(" ");
	if (words.length === 1) return [words[0], "\u00A0"];
	const mid = Math.ceil(words.length / 2);
	return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

export default function OrganizerCard({
	name,
	role,
	department,
	displayDepartment,
	image,
	link,
}: OrganizerCardProps) {
	const [line1, line2] = splitName(name);
	const labelDept = displayDepartment ?? department;
	const roleLabel =
		role === "Co-President" ? "Co-President" : `${role} – ${labelDept}`;

	const linkedInIcon = (
		<Image
			src={LinkedInImage}
			alt="LinkedIn"
			width={40}
			height={40}
			className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
		/>
	);

	return (
		<div className="flex flex-col items-center text-center w-full">
			{/* Circular photo — scales from 80px on mobile to 168px on desktop */}
			<div className="relative w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] lg:w-[168px] lg:h-[168px] rounded-full border-[2px] sm:border-[3px] lg:border-[3.63px] border-[#CF6868] overflow-hidden flex-shrink-0">
				<Image
					src={image ?? hackerSprite}
					alt={name}
					fill
					className="object-contain"
				/>
			</div>

			{/* Name */}
			<p
				className="text-[#000000] text-[13px] sm:text-[17px] lg:text-[22px] leading-tight text-center mt-1.5 sm:mt-2"
				style={{
					fontFamily: "'Torus Pro', sans-serif",
					fontWeight: 700,
					letterSpacing: "0.05em",
				}}
			>
				{line1}
				<br />
				{line2}
			</p>

			{/* Role – Department */}
			<p
				className="text-[#000000] text-[10px] sm:text-[13px] lg:text-[16px] leading-tight text-center mt-0.5"
				style={{
					fontFamily: "'Sniglet', cursive",
					fontWeight: 400,
					letterSpacing: "0.05em",
				}}
			>
				{roleLabel}
			</p>

			{/* LinkedIn */}
			{link ? (
				<a
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`${name} LinkedIn`}
				>
					{linkedInIcon}
				</a>
			) : (
				<div>{linkedInIcon}</div>
			)}
		</div>
	);
}
