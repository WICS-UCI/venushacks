import { redirect } from "next/navigation";
import getUserIdentity from "@/lib/utils/getUserIdentity";
import LoginForm from "./components/LoginForm";

async function Login({
	searchParams,
}: {
	searchParams: {
		return_to?: string;
	};
}) {
	const { return_to } = searchParams;

	const identity = await getUserIdentity();
	if (identity.uid !== null) {
		redirect(return_to ?? "/portal");
	}

	return <LoginForm return_to={return_to} />;
}

export default Login;
