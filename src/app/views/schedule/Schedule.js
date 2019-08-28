import React from "react";
import './Schedule.scss';

import Fade from 'react-reveal/Fade';

function Schedule() {
  return (
    <div className="Schedule">
      <div className="stripes">
        <Fade cascade duration={1000}>
          <div className='inner0'></div>
          <div className='inner1'></div>
          <div className='inner2'></div>
          <div className='inner3'></div>
        </Fade>
      </div>
      <section id="schedule-block">
        <div className="schedule-countdown">
          <div>
            <h3>
              00 HOURS
            </h3>
            <h3>
              00 MIN
            </h3>
            <h3>
              00 SEC
            </h3>
          </div>
          <div className="schedule-countdown-border"></div>
        </div>
        <div className="schedule-card">
         
        </div>
      </section>
      <section id="credits">
        <p>Made with <a href="https://en.wikipedia.org/wiki/Anteater">&hearts;</a> in Irvine, CA</p>
      </section>
    </div>
  );
}

export default Schedule;
