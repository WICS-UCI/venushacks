import { useEffect, useState } from "react";
import { Countdown, ScheduleCard } from "src/app/components";

import { Container } from "react-bootstrap";
import StaticCoral from "src/app/components/static-coral/StaticCoral";
import "./Schedule.scss";

// const HACKING_END = "25 May 2025 09:00:00 PDT";
// const HACKING_START = new Date("23 May 2025 21:00:00 PDT");
const HACKING_END = "25 April 2025 09:00:00 PDT"; // These are temporary test dates in order to see the timer
const HACKING_START = new Date("22 April 2025 21:00:00 PDT");
// TODO: Add bubbles with animations around the timer

const Schedule = () => {
	const [showCountdown, setShowCountdown] = useState(false);

	useEffect(() => {
		const now = new Date();
		setShowCountdown(now >= HACKING_START);
	}, []);

	return (
		<div className="Schedule">
			<section id="schedule-block">
				<h1 className="schedule-title">SCHEDULE</h1>

				{showCountdown && (
					<>
						<h4 className="schedule-hacking-ends-in">
							All times in PDT. Hacking ends in:
						</h4>
						<div className="schedule-countdown">
							<Container className="container-style">
								<div className="countdown-content">
									<Countdown date={HACKING_END} />
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
