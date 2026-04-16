import axios from "axios";
import useSWR from "swr";

import { ParticipantRole, Status, Uid, Score } from "@/lib/userRecord";

export type Review = [string, Uid, Score];

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
	git_experience: string;
	github: string | null;
	portfolio: string | null;
	linkedin: string | null;
	mentor_prev_experience_saq1: string | null;
	mentor_interest_saq2: string;
	mentor_team_help_saq3: string;
	mentor_team_help_saq4: string;
	resume_share_to_sponsors: boolean;
	other_questions: string | null;
	resume_url: string;
	submission_time: string;
	reviews: Review[];
}

export interface VolunteerApplicationData extends BaseApplicationData {
	frq_volunteer: string;
	frq_utensil: string;
	allergies: string | null;
	extra_questions: string | null;
	other_questions: string | null;
	friday_availability: ReadonlyArray<number>;
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

	async function submitDetailedReview(uid: Uid, scores: object) {
		await axios.post("/api/admin/detailed-review", {
			applicant: uid,
			scores: scores,
		});
		// TODO: provide success status to display in alert
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
export type submitDetailedReview = (uid: Uid, scores: object) => Promise<void>;

export default useApplicant;
