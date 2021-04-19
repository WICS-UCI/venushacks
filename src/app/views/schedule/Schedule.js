import React from "react";
import './Schedule.scss';


import { FloatingHat, ScheduleCard } from 'app/components';

function Schedule() {
  return (
    <div className="Schedule">
      <section id="schedule-block">
        <div className="schedule-countdown">
          <FloatingHat offset={0}></FloatingHat>
          <h2>
            Schedule
          </h2>
            <FloatingHat offset={2}></FloatingHat>
        </div>
        <ScheduleCard/>
      </section>
    </div>
  );
}

export default Schedule;
