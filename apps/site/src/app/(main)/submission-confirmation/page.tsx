import ApplicationSubmittedModal from "../portal/@applicant/components/ApplicationSubmittedModal";

interface PageProps {
	searchParams: {
		role: "hacker" | "mentor" | "volunteer";
	};
}

export default function SubmissionConfirmationPage({
	searchParams,
}: PageProps) {
	const role = searchParams.role;

	return <ApplicationSubmittedModal role={role} />;
}
