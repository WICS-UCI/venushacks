import {
	Countdown,
	FloatingLaptop,
	Footer,
	ScheduleCard,
} from "src/app/components";

import "./Schedule.scss";

const HACKING_DEADLINE = "28 May 2023 09:00:00 PDT";

const Schedule = () => (
	<div className="Schedule">
		<section id="schedule-block">
			<div className="schedule-header">
				<FloatingLaptop offset={0} />
				<h2>Schedule</h2>
				<FloatingLaptop offset={2} />
			</div>
			<h4 className="schedule-hacking-ends-in">
				All times in PDT. Hacking ends in:
			</h4>
			<div className="schedule-countdown">
				<Countdown date={HACKING_DEADLINE} />
			</div>
			<h4 className="schedule-hacking-ends-in">See you next year!</h4>
			<ScheduleCard />
		</section>
		<Footer />
	</div>
);

// const Schedule = () => process.env.NEXT_PUBLIC_MAINTENANCE_MODE_SCHEDULE ? redirect("/") :<p>Schedule</p>;

export default Schedule;
