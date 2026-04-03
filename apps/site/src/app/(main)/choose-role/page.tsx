import { redirect } from "next/navigation";

import getUserIdentity from "@/lib/utils/getUserIdentity";
import ChooseRoleModal from "./ChooseRoleModal";

export default async function Page() {
	const identity = await getUserIdentity();

	if (!identity || identity.uid === null) {
		redirect("/login");
	}
	return <ChooseRoleModal />;
}
