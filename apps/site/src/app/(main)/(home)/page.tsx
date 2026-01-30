import {
	Landing,
	ChooseCharacter,
	FAQ,
	Sponsors,
	Partners,
	Organizers,
} from "./sections";

export const revalidate = 60;

export default function Home() {
	// Show landing section only if still in maintenance,
	// otherwise show the rest of the sections
	return process.env.MAINTENANCE_MODE_HOME ? (
		<>
			<Landing />
		</>
	) : (
		<>
			<Landing />
			{/* <ChooseCharacter />
			<FAQ />
			<Sponsors />
			<Partners />
			<Organizers /> */}
		</>
	);
}
