import Image from "next/image";
import LinkedInImage from "@/assets/images/linkedin.png";
import checkerImage from "@/assets/images/checker.png";

interface OrganizerCardProps {
	name: string;
	role: string;
	department: string;
	image?: string;
	link?: string;
}

function splitName(name: string): [string, string] {
	const words = name.trim().split(" ");
	if (words.length === 1) return [words[0], "\u00A0"]; // single word — pad with non-breaking space
	const mid = Math.ceil(words.length / 2);
	return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

export default function OrganizerCard({
	name,
	role,
	department,
	image,
	link,
}: OrganizerCardProps) {
	const [line1, line2] = splitName(name);

	const profileImage = (
		<div className="relative w-[168px] h-[168px] rounded-full border-[3.63px] border-[#CF6868] overflow-hidden flex-shrink-0">
			<Image
				src={image ?? checkerImage}
				alt={name}
				fill
				className="object-cover"
			/>
		</div>
	);

	return (
		<div className="flex flex-col items-center text-center">
			{/* Circular photo */}
			{profileImage}
 
			{/* Name */}
			<p
				className="text-[#000000] text-[22px] leading-[24px] text-center mt-2"
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
				className="text-[#000000] text-[16px] leading-[4px] text-center"
				style={{
					fontFamily: "'Sniglet', cursive",
					fontWeight: 400,
					letterSpacing: "0.05em",
				}}
			>
				{role} - {department}
			</p>
 
			{/* LinkedIn */}
			{link ? (
				<a
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`${name} LinkedIn`}
				>
					<Image src={LinkedInImage} alt="LinkedIn" width={40} height={40} />
				</a>
			) : (
				<Image src={LinkedInImage} alt="LinkedIn" width={40} height={40} className="mt-0.5" />
			)}
		</div>
	);
}
