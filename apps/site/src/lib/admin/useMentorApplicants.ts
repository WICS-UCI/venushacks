import axios from "axios";
import useSWR from "swr";

import { Decision, Status } from "@/lib/userRecord";

export interface MentorApplicantSummary {
	_id: string;
	first_name: string;
	last_name: string;
	status: Status;
	decision: Decision | null;
	application_data: {
		email: string;
		submission_time: string;
	};
}

const fetcher = async (url: string) => {
	const res = await axios.get<MentorApplicantSummary[]>(url);
	return res.data;
};

function useMentorApplicants() {
	const { data, error, isLoading, mutate } = useSWR<MentorApplicantSummary[]>(
		"/api/admin/applicants/mentors",
		fetcher,
	);

	const refetch = () => mutate();

	return { applicantList: data || [], loading: isLoading, error, refetch };
}

export default useMentorApplicants;
