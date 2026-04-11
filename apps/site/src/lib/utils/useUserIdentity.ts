import axios from "axios";

import { Role, Uid } from "@/lib/userRecord";
import useSWR from "swr";

export interface Identity {
	uid: Uid | null;
	roles: ReadonlyArray<Role>;
	status: string | null;
	submission_time: string;
}

const fetcher = async (url: string) => {
	const res = await axios.get<Identity>(url);
	return res.data;
};

function useUserIdentity() {
	const { data } = useSWR<Identity>("/api/user/me", fetcher);

	return data;
}

export default useUserIdentity;
