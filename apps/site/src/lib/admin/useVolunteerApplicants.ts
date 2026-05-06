import axios from "axios";
import useSWR from "swr";

import { Decision, Status } from "@/lib/userRecord";

export interface VolunteerApplicantSummary {
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
	const res = await axios.get<VolunteerApplicantSummary[]>(url);
	return res.data;
};

function useVolunteerApplicants() {
	const { data, error, isLoading, mutate } = useSWR<VolunteerApplicantSummary[]>(
		"/api/admin/applicants/volunteers",
		fetcher,
	);

	const refetch = () => mutate();

	return { applicantList: data || [], loading: isLoading, error, refetch };
}

export default useVolunteerApplicants;
