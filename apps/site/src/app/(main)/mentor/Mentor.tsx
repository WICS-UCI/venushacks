import ApplicationFlow from "@/lib/components/forms/shared/ApplicationFlow";
import MentorForm from "./Form/MentorForm";

export const revalidate = 60;

export default async function Mentor({
	searchParams,
}: {
	searchParams: {
		prefaceAccepted?: string;
	};
}) {
	return (
		<ApplicationFlow
			searchParams={searchParams}
			applicationType="Mentor"
			applicationURL="/mentor"
		>
			<MentorForm />
		</ApplicationFlow>
	);
}
