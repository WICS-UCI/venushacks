import axios from "axios";
import useSWR from "swr";

import { Decision, Status } from "@/lib/userRecord";

export interface HackerApplicantSummary {
	_id: string;
	first_name: string;
	last_name: string;
	status: Status;
	decision: Decision | null;
	reviewers: ReadonlyArray<string>;
	avg_score: number;
	resume_reviewed: boolean;
	application_data: {
		school?: string;
		school_year?: string;
		submission_time: string;
		normalized_scores?: Record<string, number>;
		extra_points?: number;
		email: string;
		resume_url: string;
		review_breakdown?: Record<
			string,
			Record<string, Record<string, number> | number>
		>;
	};
}

const fetcher = async (url: string) => {
	const res = await axios.get<HackerApplicantSummary[]>(url);
	return res.data;
};

function useHackerApplicants() {
	const { data, error, isLoading, mutate } = useSWR<HackerApplicantSummary[]>(
		"/api/admin/applicants/hackers",
		fetcher,
	);

	const refetch = () => mutate();

	return { applicantList: data || [], loading: isLoading, error, refetch };
}

export default useHackerApplicants;
