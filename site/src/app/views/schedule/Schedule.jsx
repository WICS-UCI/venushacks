import {
	Countdown,
	ScheduleCard,
} from "src/app/components";

import "./Schedule.scss";
import { Container } from "react-bootstrap";

const HACKING_DEADLINE = "26 May 2024 09:00:00 PDT";

const Schedule = () => (
	<div className="Schedule">
		<section id="schedule-block">
			<h1 className="schedule-title">SCHEDULE</h1>
			<h4 className="schedule-hacking-ends-in">
				All times in PDT. Hacking ends in:
			</h4>
			<div className="schedule-countdown">
				<Container className="container-style">
					<Countdown date={HACKING_DEADLINE} />
				</Container>
			</div>
			<h4 className="schedule-hacking-ends-in">Blast off!</h4>
			<ScheduleCard />
		</section>
	</div>
);

// const Schedule = () => process.env.NEXT_PUBLIC_MAINTENANCE_MODE_SCHEDULE ? redirect("/") :<p>Schedule</p>;

export default Schedule;
