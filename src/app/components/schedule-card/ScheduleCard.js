import React from 'react';
import './ScheduleCard.scss';

function ScheduleCard() {
  return (
    <div className="schedule-card">
      <div className="schedule-card-section">
        <div>
          <h4>Saturday</h4>
          {[1,2,3,4,5].map(function(item, index) {
            return(
              <div className="schedule-card-time-slot">
                <div>
                  <h5>Some Event</h5>
                  <p>Hay Baby</p>
                </div>

                <div>
                  <h5>12:00AM-1PM</h5>
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
          {[1,2,3].map(function(item, index) {
            return(
              <div className="schedule-card-time-slot">
                <div>
                  <h5>Some Event</h5>
                  <p>Hay Baby</p>
                </div>

                <div>
                  <h5>12:00AM-1PM</h5>
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