import ApplicationFlow from "@/lib/components/forms/shared/ApplicationFlow";
import HackerForm from "./Form/HackerForm";

export const revalidate = 60;

export default async function Hacker({
	searchParams,
}: {
	searchParams: {
		prefaceAccepted?: string;
	};
}) {
	return (
		<ApplicationFlow
			searchParams={searchParams}
			applicationType="Hacker"
			applicationURL="/apply"
		>
			<HackerForm />
		</ApplicationFlow>
	);
}
