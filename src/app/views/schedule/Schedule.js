import React from "react";
import './Schedule.scss';

import { Countdown, FloatingHat, Footer, ScheduleCard } from 'app/components';

const HACKING_DEADLINE = "28 May 2023 09:00:00 PDT";

const Schedule = () => (
  <div className="Schedule">
    <section id="schedule-block">
      <div className="schedule-header">
        <FloatingHat offset={0}></FloatingHat>
        <h2>Schedule</h2>
        <FloatingHat offset={2}></FloatingHat>
      </div>
      <h4 className="schedule-hacking-ends-in">All times in PDT. Hacking ends in:</h4>
      <div className="schedule-countdown">
        <Countdown date={HACKING_DEADLINE} />
      </div>
      <h4 className="schedule-hacking-ends-in">See you next year!</h4>
      <ScheduleCard/>
    </section>
    <Footer/>
  </div>
);

export default Schedule;
