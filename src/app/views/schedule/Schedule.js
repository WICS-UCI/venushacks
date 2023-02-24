import React from "react";
import './Schedule.scss';


import { FloatingHat, ScheduleCard, Footer } from 'app/components';

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
        <h4> All times are in PDT </h4>
        <h4 style={{'marginBottom': '400px'}}> Schedule coming soon! </h4>
        {/* <ScheduleCard/> */}
      </section>
      <Footer/>
    </div>
  );
}

export default Schedule;
