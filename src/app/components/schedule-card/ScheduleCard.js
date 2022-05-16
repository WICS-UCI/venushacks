import React from 'react';
import './ScheduleCard.scss';

import { scheduleData } from "assets/data/schedule-info.js";

function ScheduleCard() {
  const {thurSchedule, friSchedule, satSchedule, sunSchedule} = scheduleData;

  return (
    <div className="schedule-card">
      <div className="schedule-card-section">
        <div>
          <h4>Thursday</h4>
          <div className="schedule-card-divider-horizontal">
            <div/>
          </div>
          {thurSchedule.map(function(event, index) {
            return(
              <div className="schedule-card-time-slot" key={index}>
                <div>
                    <h5> {event.name}</h5>
                  <div class="schedule-card-location">
                  <a href={event.link}  style={{'text-decoration': 'none'}}>
                  <p>{event.location}</p>
                  </a>
                    </div>
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
          <h4>Friday</h4>
          <div className="schedule-card-divider-horizontal">
            <div/>
          </div>
          {friSchedule.map(function(event, index) {
            return(
              <div className="schedule-card-time-slot" key={index}>
                <div>
                    <h5> {event.name}</h5>
                  <div class="schedule-card-location">
                  <a href={event.link}  style={{'text-decoration': 'none'}}>
                  <p>{event.location}</p>
                  </a>
                    </div>
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
          <h4>Saturday</h4>
          <div className="schedule-card-divider-horizontal">
            <div/>
          </div>
          {satSchedule.map(function(event, index) {
            return(
              <div className="schedule-card-time-slot" key={index}>
                <div>
                    <h5> {event.name}</h5>
                  <div class="schedule-card-location">
                  <a href={event.link}  style={{'text-decoration': 'none'}}>
                  <p>{event.location}</p>
                  </a>
                    </div>
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
          {sunSchedule.map(function(event, index) {
            return(
              <div className="schedule-card-time-slot" key={index}>
                <div>
                    <h5> {event.name}</h5>
                  <div class="schedule-card-location">
                  <a href={event.link}  style={{'text-decoration': 'none'}}>
                  <p>{event.location}</p>
                  </a>
                    </div>
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
    </div>
  );
}

export default ScheduleCard