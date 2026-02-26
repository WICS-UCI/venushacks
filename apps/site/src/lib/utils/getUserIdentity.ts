import { cache } from "react";
import { cookies } from "next/headers";

import axios from "axios";

import { Role, Uid } from "@/lib/userRecord";

import api from "./api";

export interface Identity {
	uid: Uid | null;
	roles: ReadonlyArray<Role>;
	status: string | null;
}

async function getUserIdentity(): Promise<Identity> {
	// Indicate to Next.js that components using this function need to be dynamically rendered.
	// Otherwise, Next.js will try to use static rendering and error. See #168 for explanation.
	// This might be removable when upgrading to `dynamicIO` in Next.js 15
	// The cookies will actually be added by a request interceptor on the Axios instance
	void cookies();

	try {
		const identity = await api.get<Identity>("/user/me");
		return identity.data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			console.error(`[getUserIdentity] ${err.message}`);
		} else {
			// Don't think this case is possible/relevant but for completeness
			console.error(err);
		}
		return { uid: null, roles: [], status: null };
	}
}

// Use request memoization so that the API request is made only once when React renders the tree
// Axios uses XHR by default internally unlike `fetch` which would be automatically cached
export default cache(getUserIdentity);
