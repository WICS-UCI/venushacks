import axios from "axios";
import useSWR from "swr";

import { ParticipantRole, Status, Uid, Score } from "@/lib/userRecord";

export type Review =
	| [string, Uid, Score]
	| [string, Uid, Score, string | null]
	| [string, Uid, Score, string | null, boolean];

// The application responses submitted by an applicant
interface BaseApplicationData {
	email: string;
	pronouns: string[];
	is_18_older: boolean;
	school: string;
	year: string;
	majors_and_minors: string;
}

export type HackathonExperience = "first_time" | "some_experience" | "veteran";

export interface HackerApplicationData extends BaseApplicationData {
	how_did_you_hear_about_us: string;
	share_resume_with_sponsors: boolean;
	previous_hackathons: string;
	previous_vh: boolean;
	frq_diversity: string;
	frq_picnic: string;
	frq_project: string;
	questions_comments_concerns: string;
	resume_url: string;
	submission_time: string;
	reviews: Review[];
}

export interface MentorApplicationData extends BaseApplicationData {
	is_18_older: boolean;
	affiliation: string;
	year: string;
	major: string;
	resume_url: string;
	linkedin: string | null;
	github: string | null;
	website: string | null;
	areas_of_development: string;
	additional_skills_technologies: string;
	proficiency_c: string;
	proficiency_cpp: string;
	proficiency_django: string;
	proficiency_expressjs: string;
	proficiency_figma: string;
	proficiency_firebase: string;
	proficiency_flask: string;
	proficiency_html_css: string;
	proficiency_java: string;
	proficiency_javascript: string;
	proficiency_mongodb: string;
	proficiency_nodejs: string;
	proficiency_nosql: string;
	proficiency_python: string;
	proficiency_react: string;
	proficiency_rest_apis: string;
	proficiency_sass: string;
	proficiency_sql: string;
	why_mentor_frq: string;
	contribute_inclusive_frq: string;
	questions_comments_concerns: string;
	availability: string;
	availability_specify: string | null;
	submission_time: string;
	reviews: Review[];
}

export interface VolunteerApplicationData extends BaseApplicationData {
	is_18_older: boolean;
	minimum_5_hours: boolean;
	school: string;
	education_level: string;
	major: string;
	prior_experience: string;
	frq_expect_to_gain: string;
	frq_picnic: string;
	frq_volunteer: string;
	questions_comments_concerns: string;
	saturday_availability: ReadonlyArray<number>;
	sunday_availability: ReadonlyArray<number>;
	submission_time: string;
	reviews: Review[];
}

export type HackerApplicationQuestion = Exclude<
	keyof HackerApplicationData,
	"reviews"
>;

export type MentorApplicationQuestion = Exclude<
	keyof MentorApplicationData,
	"reviews"
>;

export type VolunteerApplicationQuestion = Exclude<
	keyof VolunteerApplicationData,
	"reviews"
>;

type ApplicationData =
	| HackerApplicationData
	| MentorApplicationData
	| VolunteerApplicationData;

export interface Applicant {
	_id: Uid;
	first_name: string;
	last_name: string;
	roles: ReadonlyArray<ParticipantRole>;
	status: Status;
	application_data: ApplicationData;
}

const fetcher = async ([api, applicationType, uid]: [string, string, Uid]) => {
	if (!uid) {
		return null;
	}
	const res = await axios.get<Applicant>(api + `${applicationType}/${uid}`);
	return res.data;
};

function useApplicant(
	uid: Uid,
	applicationType: "hacker" | "mentor" | "volunteer",
) {
	const { data, error, isLoading, mutate } = useSWR<
		Applicant | null,
		unknown,
		[string, string, Uid]
	>(["/api/admin/applicant/", applicationType, uid], fetcher);

	async function submitReview(uid: Uid, score: number) {
		await axios.post("/api/admin/review", { applicant: uid, score: score });
		// TODO: provide success status to display in alert
		mutate();
	}

	async function submitDetailedReview(
		uid: Uid,
		scores: object,
		notes: string | null = null,
		isExperienced: boolean = false,
	) {
		await axios.post("/api/admin/detailed-review", {
			applicant: uid,
			scores: scores,
			notes: notes?.trim() || null,
			is_experienced: isExperienced,
		});
		mutate();
	}

	return {
		applicant: data,
		loading: isLoading,
		error,
		submitReview,
		submitDetailedReview,
	};
}

export type submitReview = (uid: Uid, score: number) => Promise<void>;
export type submitDetailedReview = (
	uid: Uid,
	scores: object,
	notes?: string | null,
	isExperienced?: boolean,
) => Promise<void>;

export default useApplicant;
