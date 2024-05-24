import "./ScheduleCard.scss";

import { scheduleData } from "../../data/schedule-info";

const Event = ({ name, description, time, tooltip }) => (
	<div className="schedule-card-time-slot">
		<div>
			<h5 className="time-slot-name">{name}</h5>
			<h5 className="time">{time}</h5>
			<div className="schedule-card-tooltip">
				<p className="schedule-card-description">{description}</p>
				{tooltip && (
					<span className="schedule-card-tooltiptext">{tooltip}</span>
				)}
			</div>
		</div>
	</div>
);

const ScheduleCard = () => {
	const { friSchedule, satSchedule, sunSchedule } = scheduleData;

	return (
		<div className="schedule-card">
			<div className="schedule-card-section">
				<div>
					<h4>Friday</h4>
					<div className="schedule-card-divider-horizontal">
						<div />
					</div>
					{friSchedule.map((event, index) => (
						<Event {...event} key={index} />
					))}
				</div>
			</div>
			<div className="schedule-card-section">
				<div>
					<h4>Saturday</h4>
					<div className="schedule-card-divider-horizontal">
						<div />
					</div>
					{satSchedule.map((event, index) => (
						<Event {...event} key={index} />
					))}
				</div>
			</div>
			<div className="schedule-card-section">
				<div>
					<h4>Sunday</h4>
					<div className="schedule-card-divider-horizontal">
						<div />
					</div>
					{sunSchedule.map((event, index) => (
						<Event {...event} key={index} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ScheduleCard;
