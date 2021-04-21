import React from 'react';
import './ScheduleCard.scss';

import { satScheduleData } from "assets/data/sat-schedule-info.js";
import { sunScheduleData } from "assets/data/sun-schedule-info.js";

function ScheduleCard() {
  return (
    <div className="schedule-card">
      <div className="schedule-card-section">
        <div>
          <h4>Saturday</h4>
          <div className="schedule-card-divider-horizontal">
            <div/>
          </div>
          {satScheduleData.map(function(event, index) {
            return(
              <div className="schedule-card-time-slot" key={index}>
                <div>
                  <a href={event.link}  style={{'text-decoration': 'none'}}> 
                    <h5> {event.name}</h5>
                  </a>
                  <div class="schedule-card-tooltip">
                    <p>{event.description}</p>
                    <span class="schedule-card-tooltiptext">{event.tooltip}</span>
                  </div>
                </div>
                <div style={{'textAlign': 'right'}}>
                  <h5>{event.time}</h5>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="schedule-card-section">
        <div>
          <h4>Sunday</h4>
          <div className="schedule-card-divider-horizontal">
            <div/>
          </div>
          {sunScheduleData.map(function(event, index) {
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