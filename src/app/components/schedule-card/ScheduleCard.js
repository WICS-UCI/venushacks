import React from 'react';
import './ScheduleCard.scss';

import { scheduleData } from 'assets/data/schedule-info';

function ScheduleCard() {
  const {satSchedule, sunSchedule} = scheduleData;

  return (
    <div className="schedule-card">
      <div className="schedule-card-section">
        <div>
          <h4>Saturday</h4>
          {satSchedule.map(function(event, index) {
            return(
              <div className="schedule-card-time-slot" key={index}>
                <div>
                  <a href={event.link}  style={{'text-decoration': 'none'}}> 
                    <h5> {event.name}</h5>
                  </a>
                  <p>{event.description}</p>
                </div>
                <div style={{'textAlign': 'right'}}>
                  <h5>{event.time}</h5>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="schedule-card-divider-vertical">
        <div/>
      </div>
      <div className="schedule-card-divider-horizontal">
        <div/>
      </div>
      <div className="schedule-card-section">
        <div>
          <h4>Sunday</h4>
          {sunSchedule.map(function(event, index) {
            return(
              <div className="schedule-card-time-slot" key={index}>
                <div>
                  <a href={event.link}  style={{'text-decoration': 'none'}}> 
                    <h5> {event.name}</h5>
                  </a>
                  <p>{event.description}</p>
                </div>
                <div style={{'textAlign': 'right'}}>
                  <h5>{event.time}</h5>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default ScheduleCard