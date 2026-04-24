import { useState } from "react";
import {
	ExpandableSection,
	SpaceBetween,
	ButtonProps,
	Spinner,
	Alert,
	Flashbar,
} from "@cloudscape-design/components";

import useApplicant, {
	HackerApplicationQuestion,
	HackerApplicationData,
} from "@/lib/admin/useApplicant";
import HackerApplicationSection from "@/app/admin/applicants/hackers/components/HackerApplicationSection";
import WRRubricContainer, { RubricRow } from "../../components/WRRubricContainer";
import ResumeRubricContainer from "../../components/ResumeRubricContainer";
import ReviewerNotes from "../../components/ReviewerNotes";
import ScoreSummary from "../../components/ScoreSummary";

interface HackerApplicationSections {
	[key: string]: HackerApplicationQuestion[];
}

const HACKER_APPLICATION_SECTIONS: HackerApplicationSections = {
	"Personal Information": ["is_18_older", "how_did_you_hear_about_us"],
	Education: ["school", "year", "majors_and_minors"],
	Experience: [
		"resume_url",
		"share_resume_with_sponsors",
		"previous_hackathons",
		"previous_vh",
	],
	"Free Response Questions": [
		"frq_project",
		"frq_diversity",
		"frq_picnic",
		"questions_comments_concerns",
	],
};

const RESUME_INEXPERIENCED_RUBRIC: RubricRow[] = [
	{
		criterion: "Resume (Inexperienced)",
		maxPoints: 2,
		descriptors: [
			{
				points: 2,
				description: "1+ relevant experiences with descriptions. Effort shown towards formatting and presentation.",
			},
			{
				points: 1,
				description: "Experience with descriptions. Formatting could use some work.",
			},
			{
				points: 0,
				description: "Not full page. No resume.",
			},
		],
	},
];

const RESUME_EXPERIENCED_RUBRIC: RubricRow[] = [
	{
		criterion: "Resume (Experienced)",
		maxPoints: 2,
		descriptors: [
			{
				points: 2,
				description: "2+ relevant experiences with descriptions. Professional formatting.",
			},
			{
				points: 1,
				description: "Non-relevant experience mentioned. Poor formatting.",
			},
			{
				points: 0,
				description: "Not full page. No resume.",
			},
		],
	},
];

const WR1_RUBRIC: RubricRow[] = [
	{
		criterion: "Content Relevance",
		maxPoints: 3,
		descriptors: [
			{
				points: 3,
				description:
					"Project is clearly and concisely communicated. Shows strong passion. Applicable to VenusHacks.",
			},
			{
				points: 2,
				description: "Non-relevant details mentioned. Some passion is shown.",
			},
			{
				points: 1,
				description:
					"Briefly describes the project. Does not show passion. Not applicable to VenusHacks.",
			},
		],
	},
	{
		criterion: "Experience",
		maxPoints: 3,
		descriptors: [
			{
				points: 3,
				description:
					"Project is executed at a high level. Shows learning from the experience. Unique project.",
			},
			{
				points: 2,
				description:
					"Project is completed with signs of growth. Shows little enthusiasm.",
			},
			{
				points: 1,
				description:
					"Project is quite simple. Experience of working on the project is not communicated.",
			},
		],
	},
	{
		criterion: "Effort",
		maxPoints: 4,
		descriptors: [
			{
				points: 4,
				description: "Project is very well communicated. Around 150-word limit.",
			},
			{
				points: "2-3",
				description: "Project is communicated. Around 100 words.",
			},
			{
				points: 1,
				description: "Project is poorly communicated. Less than 100 words.",
			},
		],
	},
];

const WR2_RUBRIC: RubricRow[] = [
	{
		criterion: "Diversity & Inclusion",
		maxPoints: 8,
		descriptors: [
			{
				points: "7-8",
				description:
					"Demonstrates true understanding of diversity and inclusion. Has made strong efforts to be inclusive in their environments. Strong connection to diversity.",
			},
			{
				points: "5-6",
				description:
					"Shows general understanding of diversity and inclusion. Mentions some effort to be inclusive, but lacks specific example. Some connection to diversity, but not developed.",
			},
			{
				points: "3-4",
				description:
					"Loose understanding of diversity and inclusion. Slightly mentions inclusivity. Loose personal connection to diversity.",
			},
			{
				points: "1-2",
				description:
					"Mentions the word diversity or inclusion. No personal connection to inclusion or diversity.",
			},
		],
	},
	{
		criterion: "Experience",
		maxPoints: 3,
		descriptors: [
			{
				points: "3",
				description: "Experience is very well communicated.",
			},
			{
				points: "2",
				description: "Experience is well communicated.",
			},
			{
				points: "1",
				description: "Experience is communicated.",
			},
			{
				points: "0",
				description: "No specific experience is mentioned.",
			},
		],
	},
	{
		criterion: "Effort",
		maxPoints: 4,
		descriptors: [
			{
				points: "4",
				description: "Around 150-word limit.",
			},
			{
				points: "3",
				description: "Around 120 words.",
			},
			{
				points: "2",
				description: "Around 100 words.",
			},
			{
				points: "1",
				description: "Less than 80 words. Obviously ChatGPT'd.",
			},
		],
	},
];

const WR3_RUBRIC: RubricRow[] = [
	{
		criterion: "Picnic Must-Haves",
		maxPoints: 3,
		descriptors: [
			{
				points: "7-8",
				description:
					"Each must-have should be unique, fun, cutesy, and a genuine MUST have item at a picnic.",
			},
		],
	},
];

interface HackerApplicationProps {
	application_data: HackerApplicationData;
	uid: string;
}

function HackerApplication({ application_data, uid }: HackerApplicationProps) {
	const {
		loading,
		error,
		submitDetailedReview,
	} = useApplicant(uid, "hacker");

	const [filled, setFilled] = useState({
		experience: false,
		frq_project: false,
		frq_diversity: false,
		frq_picnic: false,
	});
	const [scores, setScores] = useState({
		experience: 0,
		frq_project: 0,
		frq_diversity: 0,
		frq_picnic: 0,
	});
	const [isExperienced, setIsExperienced] = useState(false);
	const [notes, setNotes] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [flashMessages, setFlashMessages] = useState<React.ComponentProps<typeof Flashbar>["items"]>([]);

	const handleFilledChange = (key: keyof typeof filled) => (isFilled: boolean) => {
		setFilled((prev) => ({ ...prev, [key]: isFilled }));
	};

	const handleScoreChange = (key: keyof typeof scores) => (score: number) => {
		setScores((prev) => ({ ...prev, [key]: score }));
	};

	const allFilled = Object.values(filled).every(Boolean);

	const onSubmit: ButtonProps["onClick"] = async (e: CustomEvent<ButtonProps.ClickDetail>) => {
		e.preventDefault();
		setSubmitting(true);
		setFlashMessages([]);
		try {
			await submitDetailedReview(uid, scores, notes.trim() || null, isExperienced);
			setNotes("");
			setFlashMessages([{
				type: "success",
				content: "Review submitted successfully!",
				dismissible: true,
				onDismiss: () => setFlashMessages([]),
				id: "submit-success",
			}]);
		} catch (err) {
			setFlashMessages([{
				type: "error",
				content: "Failed to submit review. Please try again.",
				dismissible: true,
				onDismiss: () => setFlashMessages([]),
				id: "submit-error",
			}]);
		} finally {
			setSubmitting(false);
		}
	};

	if (loading) {
		return <Spinner variant="inverted" />;
	}

	if (error) {
		return (
			<Alert type="error" header="Failed to load applicant">
				Could not load applicant data. Please refresh the page.
			</Alert>
		);
	}

	return (
		<SpaceBetween direction="vertical" size="m">
			<div style={{ position: "fixed", bottom: "1rem", right: "1rem", zIndex: 1000, width: "400px" }}>
				<Flashbar items={flashMessages ?? []} />
			</div>

			<ExpandableSection
				variant="container"
				headerText="Hacker Application Information"
			>
				<SpaceBetween direction="vertical" size="m">
					{Object.entries(HACKER_APPLICATION_SECTIONS).map(([section, questions]) => (
						<HackerApplicationSection
							key={section}
							title={section}
							data={application_data}
							propsToShow={questions}
						/>
					))}
				</SpaceBetween>
			</ExpandableSection>

			<ResumeRubricContainer
				title="Resume — 2 points"
				inexperiencedRubric={RESUME_INEXPERIENCED_RUBRIC}
				experiencedRubric={RESUME_EXPERIENCED_RUBRIC}
				namePrefix="experience"
				isExperienced={isExperienced}
				resumeUrl={application_data.resume_url}
				onScoreChange={handleScoreChange("experience")}
				onFilledChange={handleFilledChange("experience")}
				onIsExperiencedChange={setIsExperienced}
			/>
			<WRRubricContainer
				title="Written Response 1 — 10 points"
				description="Describe a project you are passionate about that you've worked on in the past or are currently working on. It can be technical or non-technical! (150 words)"
				rubric={WR1_RUBRIC}
				applicantResponse={application_data.frq_project}
				namePrefix="frq_project"
				onScoreChange={handleScoreChange("frq_project")}
				onFilledChange={handleFilledChange("frq_project")}
			/>
			<WRRubricContainer
				title="Written Response 2 — 15 points"
				description="How have your past experiences shaped your definition of diversity and inclusivity? (150 words)"
				rubric={WR2_RUBRIC}
				applicantResponse={application_data.frq_diversity}
				namePrefix="frq_diversity"
				onScoreChange={handleScoreChange("frq_diversity")}
				onFilledChange={handleFilledChange("frq_diversity")}
			/>
			<WRRubricContainer
				title="Written Response 3 — 3 points"
				description="What are your 3 must-haves at a picnic? (50 words)"
				rubric={WR3_RUBRIC}
				applicantResponse={application_data.frq_picnic}
				namePrefix="frq_picnic"
				onScoreChange={handleScoreChange("frq_picnic")}
				onFilledChange={handleFilledChange("frq_picnic")}
			/>
			<ReviewerNotes
				notes={notes}
				onNotesChange={setNotes}
				reviews={application_data.reviews}
			/>
			<ScoreSummary
				sections={[
					{ label: "Resume", score: scores.experience, maxPoints: 2 },
					{ label: "Written Response 1", score: scores.frq_project, maxPoints: 10 },
					{ label: "Written Response 2", score: scores.frq_diversity, maxPoints: 15 },
					{ label: "Written Response 3", score: scores.frq_picnic, maxPoints: 3 },
				]}
				onSubmit={onSubmit}
				disabled={!allFilled || submitting}
				loading={submitting}
			/>
		</SpaceBetween>
	);
}

export default HackerApplication;
