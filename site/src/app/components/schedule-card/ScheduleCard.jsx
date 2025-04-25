import { useState } from "react";
import DayRadioButtons from "src/app/components/day-radio-buttons/DayRadioButtons";
import useSchedule from "src/app/components/schedule-card/useSchedule";
import "./ScheduleCard.scss";

const days = ["Friday", "Saturday", "Sunday"];

export default function ScheduleCard() {
	const { schedule, isLoading, error } = useSchedule();
	const [selectedDay, setSelectedDay] = useState("Friday");
	const events = schedule ? schedule[selectedDay.toLowerCase()] || [] : [];
	const grouped = events ? groupEventsByTime(events) : {};
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!schedule) return <div>No schedule found.</div>;
	return (
		<div className="schedule-container">
			<DayRadioButtons
				days={days}
				selected={selectedDay}
				onChange={setSelectedDay}
			/>

			<div className="schedule-card">
				{Object.entries(grouped).map(([timeRange, eventGroup], i) => (
					<div className="schedule-time-block" key={i}>
						<div className="time-label">
							<strong>{timeRange}</strong>
						</div>
						<div className="event-group">
							{eventGroup.map((event) => (
								<div className="event-info" key={event._id || event.name}>
									<h4 className="event-title">{event.name}</h4>
									{event.description && (
										<p className="event-description">{event.description}</p>
									)}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function groupEventsByTime(events) {
	const timeMap = {};

	events.forEach((event) => {
		const timeRange = formatTimeRange(event.startTime, event.endTime);

		if (!timeMap[timeRange]) {
			timeMap[timeRange] = [];
		}
		timeMap[timeRange].push(event);
	});

	return timeMap;
}

function formatTimeRange(start, end) {
	const options = { hour: "numeric", minute: "2-digit", hour12: "true" };
	return `${new Date(start).toLocaleTimeString([], options)} - ${new Date(
		end
	).toLocaleTimeString([], options)}`;
}
