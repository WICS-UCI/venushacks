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
      <iframe class="airtable-embed" src="https://airtable.com/embed/shrd1SNSkbUcd6Yeq?backgroundColor=purple&viewControls=on" frameborder="0" onmousewheel="" width="80%" height="633" style={{marginBottom: '100px', background: 'transparent', border: '1px solid #ccc'}}></iframe>    
      </div>
  );
}

export default Schedule;
