import BarChart from "@cloudscape-design/components/bar-chart";
import Box from "@cloudscape-design/components/box";

import useApplicationsSummary from "./useApplicationsSummary";

const TIME_SPEC = "T00:00:00-08:00";
const START_DAY = new Date("2026-04-06" + TIME_SPEC);
const END_DAY = new Date("2026-05-06" + TIME_SPEC);

// In reverse of desired order
const KNOWN_SCHOOLS = [
	"UC Santa Barbara",
	"UC Berkeley",
	"UC San Diego",
	"UCLA",
	"UC Riverside",
	"Cal Poly Pomona",
	"Cal State Fullerton",
	"Cal State Long Beach",
	"Orange Coast College",
	"UC Irvine",
];

function ApplicationsBySchoolChart() {
	const { loading, applications, error } = useApplicationsSummary("school");

	const sortedBySchool = Object.entries(applications).sort((a, b) => {
		const schoolA = a[0];
		const schoolB = b[0];
		if (KNOWN_SCHOOLS.includes(schoolA) || KNOWN_SCHOOLS.includes(schoolB)) {
			return KNOWN_SCHOOLS.indexOf(schoolB) - KNOWN_SCHOOLS.indexOf(schoolA);
		}
		if (schoolA < schoolB) {
			return -1;
		}
		if (schoolB > schoolA) {
			return 1;
		}
		return 0;
	});

	const today = new Date();
	const end = today < END_DAY ? today : END_DAY;

	const xDomain = [];
	for (let d = new Date(START_DAY); d <= end; d.setDate(d.getDate() + 1)) {
		xDomain.push(d.toISOString().slice(0, 10)); 
	}

	return (
		<BarChart
			series={sortedBySchool.map(([school, events]) => ({
				title: school,
				type: "bar",
				data: Object.entries(events).map(([d, count]) => ({
					x: d,       // already "2026-03-31"
					y: count,
				})),
			}))}
			xDomain={xDomain}
			i18nStrings={{
				xTickFormatter: (e) =>
					new Date(e + TIME_SPEC).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
					}),
			}}
			ariaLabel="Stacked bar chart."
			errorText="Error loading data."
			statusType={loading ? "loading" : error ? "error" : "finished"}
			fitHeight
			height={300}
			loadingText="Loading chart"
			stackedBars
			hideFilter
			xScaleType="categorical"
			xTitle="Date (Pacific Time)"
			yTitle="Total applications submitted"
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

export default ApplicationsBySchoolChart;
