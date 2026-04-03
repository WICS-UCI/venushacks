import { TimelineComponent } from "./TimelineComponent";

export const SubmissionComponent = () => {
	return (
		<TimelineComponent
			text="Application Submitted"
			finished={true}
			statusIcon="Accepted"
			size="compact"
		/>
	);
};
