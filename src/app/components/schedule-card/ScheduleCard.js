import React from 'react';
import './ScheduleCard.scss';

import { scheduleData } from "assets/data/schedule-info.js";

function Event(props) {
  const { name, description, time, tooltip } = props;

  return (
    <div className="schedule-card-time-slot">
      <div>
        <h5> {name}</h5>
        <div className="schedule-card-tooltip">
          <p className="schedule-card-description">{description}</p>
          {tooltip && <span className="schedule-card-tooltiptext">{tooltip}</span>}
        </div>
      </div>
      <div style={{ 'textAlign': 'right' }}>
        <h5>{time}</h5>
      </div>
    </div>
  )
}

function ScheduleCard() {
  // const { friSchedule, satSchedule, sunSchedule } = scheduleData;
  const { satSchedule, sunSchedule } = scheduleData;

  return (
    <div className="schedule-card">
      {/* <div className="schedule-card-section">
        <div>
          <h4>Friday</h4>
          <div className="schedule-card-divider-horizontal">
            <div />
          </div>
          {friSchedule.map((event, index) => <Event {...event} key={index} />)}
        </div>
      </div> */}
      <div className="schedule-card-section">
        <div>
          <h4>Saturday</h4>
          <div className="schedule-card-divider-horizontal">
            <div />
          </div>
          {satSchedule.map((event, index) => <Event {...event} key={index} />)}
        </div>
      </div>
      <div className="schedule-card-section">
        <div>
          <h4>Sunday</h4>
          <div className="schedule-card-divider-horizontal">
            <div />
          </div>
          {sunSchedule.map((event, index) => <Event {...event} key={index} />)}
        </div>
      </div>
    </div>
  );
}

export default ScheduleCard