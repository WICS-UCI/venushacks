import RadioGrid from "@/lib/components/forms/RadioGrid";

const COLUMNS = [
	{ value: "no_experience", label: "No Experience" },
	{ value: "beginner", label: "Beginner" },
	{ value: "intermediate", label: "Intermediate" },
	{ value: "advanced", label: "Advanced" },
];

const SKILLS = [
	"Figma",
	"Java",
	"C++",
	"C",
	"Python",
	"Node.js",
	"MongoDB",
	"HTML/CSS",
	"JavaScript",
	"Flask",
	"Django",
	"REST APIs",
	"Firebase",
	"SQL",
	"SASS",
	"Express.js",
	"NoSQL",
	"React",
].map((skill) => ({
	label: skill,
	name: `skill_${skill.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
}));

export default function CodingSkillsTable() {
	return (
		<RadioGrid
			columns={COLUMNS}
			rows={SKILLS}
			labelText="Rate your proficiency in these technologies"
			isRequired={true}
		/>
	);
}
