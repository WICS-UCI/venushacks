import AreaChart from "@cloudscape-design/components/area-chart";
import Box from "@cloudscape-design/components/box";

import { ParticipantRole } from "@/lib/userRecord";

import useApplicationsSummary from "./useApplicationsSummary";

const TIME_SPEC = "T00:00:00-08:00";
const START_DAY = new Date("2026-04-06" + TIME_SPEC);
const END_DAY = new Date("2026-05-06" + TIME_SPEC);

const ROLES = [
	ParticipantRole.Hacker,
	ParticipantRole.Mentor,
	ParticipantRole.Volunteer,
] as const;

function ApplicationsByRoleChart() {
	const { loading, applications, error } = useApplicationsSummary("role");

	const today = new Date();
	const end = today < END_DAY ? today : END_DAY;

	const cumulativeApplications = Object.fromEntries(
		ROLES.map((role) => [
			role,
			getCumulativeApplications(applications[role] ?? {}, end),
		]),
	);

	return (
		<AreaChart
			series={ROLES.map((role) => ({
				title: role,
				type: "area",
				data: cumulativeApplications[role].map(([d, count]) => {
					return { x: d, y: count };
				}),
			}))}
			xDomain={[START_DAY, end]}
			i18nStrings={{
				filterLabel: "Filter displayed data",
				filterPlaceholder: "Filter data",
				filterSelectedAriaLabel: "selected",
				xTickFormatter: (e) =>
					e.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
			}}
			ariaLabel="Stacked area chart."
			errorText="Error loading data."
			statusType={loading ? "loading" : error ? "error" : "finished"}
			fitHeight
			height={300}
			loadingText="Loading chart"
			xScaleType="time"
			xTitle="Date (Pacific Time)"
			yTitle="Cumulative total applications submitted"
			empty={
				<Box textAlign="center" color="inherit">
					<b>No data available</b>
					<Box variant="p" color="inherit">
						There is no data available
					</Box>
				</Box>
			}
		/>
	);
}

function getCumulativeApplications(
	applications: Record<string, number>,
	end: Date,
): [Date, number][] {
	const cumulativeApplications: [Date, number][] = [];

	let prev = 0;
	for (let d = new Date(START_DAY); d <= end; d.setDate(d.getDate() + 1)) {
		cumulativeApplications.push([
			new Date(d),
			// Index as YYYY-MM-DD and accumulate with previous value
			prev + (applications[d.toISOString().substring(0, 10)] ?? 0),
		]);
		prev = cumulativeApplications.at(-1)![1];
	}

	return cumulativeApplications;
}

export default ApplicationsByRoleChart;
