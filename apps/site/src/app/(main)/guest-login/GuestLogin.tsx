import { redirect } from "next/navigation";

import GuestLoginVerificationForm from "./components/GuestLoginVerificationForm";
import getUserIdentity from "@/lib/utils/getUserIdentity";

async function GuestLogin({
	searchParams,
}: {
	searchParams: {
		email?: string;
		return_to?: string;
	};
}) {
	const { email, return_to } = searchParams;

	const identity = await getUserIdentity();
	if (identity.uid !== null) {
		redirect(return_to ?? "/portal");
	}

	return <GuestLoginVerificationForm email={email} return_to={return_to} />;
}

export default GuestLogin;
