import { Countdown, ScheduleCard } from "src/app/components";

import { Container } from "react-bootstrap";
import StaticCoral from "src/app/components/static-coral/StaticCoral";
import "./Schedule.scss";

const HACKING_DEADLINE = "20 April 2025 09:00:00 PDT";

const Schedule = () => (
	<div className="Schedule">
		<section id="schedule-block">
			<h1 className="schedule-title">SCHEDULE</h1>
			<h4 className="schedule-hacking-ends-in">
				All times in PDT. Hacking ends in:
			</h4>
			<div className="schedule-countdown">
				<Container className="container-style">
					<div className="countdown-content">
						<Countdown date={HACKING_DEADLINE} />
					</div>
				</Container>
			</div>
			<ScheduleCard />
		</section>
		<StaticCoral />
	</div>
);

// const Schedule = () => process.env.NEXT_PUBLIC_MAINTENANCE_MODE_SCHEDULE ? redirect("/") :<p>Schedule</p>;

export default Schedule;
