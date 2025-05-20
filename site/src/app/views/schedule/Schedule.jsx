import { useEffect, useState } from "react";
import { Countdown, ScheduleCard } from "src/app/components";

import { Container } from "react-bootstrap";
import StaticCoral from "src/app/components/static-coral/StaticCoral";
import "./Schedule.scss";

const TIME_TO_SHOW_COUNTDOWN = new Date("23 May 2025 12:00:00 PDT");
const HACKING_START = new Date("23 May 2025 21:00:00 PDT");
const HACKING_END = new Date("25 May 2025 09:00:00 PDT");

const Schedule = () => {
	const [beforeHacking, setBeforeHacking] = useState(false);
	const [afterHackingStarts, setAfterHackingStarts] = useState(false);

	useEffect(() => {
		const intervalRef = setInterval(handleCountdown, 1000);
		return () => clearInterval(intervalRef || undefined);
	}, []);

	const handleCountdown = () => {
		const now = new Date();
		if (TIME_TO_SHOW_COUNTDOWN <= now && now < HACKING_START) {
			setBeforeHacking(true);
			setAfterHackingStarts(false);
		} else if (HACKING_START <= now) {
			setBeforeHacking(false);
			setAfterHackingStarts(true);
		}
	};

	const hackingText = beforeHacking
		? "starts"
		: afterHackingStarts
		? "ends"
		: "";
	const timeToEnd = beforeHacking
		? HACKING_START
		: afterHackingStarts
		? HACKING_END
		: "";

	return (
		<div className="Schedule">
			<section id="schedule-block">
				<h1 className="schedule-title">SCHEDULE</h1>
				<div className="schedule-bubble-wrapper">
					<div className="schedule-bubble left small" />
					<div className="schedule-bubble left medium" />
					<div className="schedule-bubble left large" />
					<div className="schedule-bubble right small" />
					<div className="schedule-bubble right medium" />
					<div className="schedule-bubble right large" />
				</div>
				{(beforeHacking || afterHackingStarts) && (
					<>
						<h4 className="schedule-hacking-ends-in">
							All times in PDT. Hacking {hackingText} in:
						</h4>
						<div className="schedule-countdown">
							<Container className="container-style">
								<div className="countdown-content">
									<Countdown date={timeToEnd} />
								</div>
							</Container>
						</div>
					</>
				)}
				<ScheduleCard />
			</section>
			<StaticCoral />
		</div>
	);
};

export default Schedule;
