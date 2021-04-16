import React from "react";
import './Schedule.scss';


import { FloatingHat, ScheduleCard } from 'app/components';

function Schedule() {
  return (
    <div className="Schedule">
      <section id="schedule-block">
        <div className="schedule-countdown">
          <div>
            <div>
              <FloatingHat offset={0}></FloatingHat>
            </div>
            <h3>
              Schedule
            </h3>
            <div>
              <FloatingHat offset={2}></FloatingHat>
            </div>
          </div>
          <div className="schedule-countdown-border"></div>
        </div>
        <ScheduleCard/>
      </section>
    </div>
  );
}

export default Schedule;
