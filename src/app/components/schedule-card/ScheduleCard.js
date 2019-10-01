import React from 'react';
import './ScheduleCard.scss';

const satSchedule = [
  {
    name: 'Breakfast + Networking',
    description: 'Meet fellow anteaters!',
    time: '8:00AM-10:00AM'
  },
  {
    name: 'Opening Ceremony',
    description: 'Getting started',
    time: '9:00AM-9:15AM'
  },
  {
    name: 'Workshop 1 (Frontend/Backend)',
    description: 'First round of workshops',
    time: '10:00AM-12:30PM'
  },
  {
    name: 'Lunch',
    description: 'Food!',
    time: '12:30PM-1:30PM'
  },
  {
    name: 'Activities',
    description: 'There\'s so much room for them!',
    time: '1:30PM-2:00PM'
  },
  {
    name: 'Workshop 2 (Frontend/Backend)',
    description: 'Round two baby',
    time: '2:00PM-4:00PM'
  },
  {
    name: 'Closing Ceremony',
    description: 'See you tomorrow!',
    time: '4:00PM-4:30PM'
  },
  {
    name: 'Activity 2',
    description: 'Still room!',
    time: '4:30PM-6:00PM'
  },
]

const sunSchedule = [
  {
    name: 'Opening Ceremony',
    description: 'Getting started again',
    time: '8:00AM-8:30AM'
  },
  {
    name: 'Hacking',
    description: 'Let\'s get down to business',
    time: '8:30AM-4:30PM'
  },
  {
    name: 'Breakfast',
    description: 'Hungry hungry',
    time: '9:00AM'
  },
  {
    name: 'Lunch',
    description: 'Still hungry',
    time: '12:00PM'
  },
  {
    name: 'Closing Ceremony',
    description: 'Cya later anteater-gators!',
    time: '5:00PM-6:00PM'
  },
  
]

function ScheduleCard() {
  return (
    <div className="schedule-card">
      <div className="schedule-card-section">
        <div>
          <h4>Saturday</h4>
          {satSchedule.map(function(event, index) {
            return(
              <div className="schedule-card-time-slot" key={index}>
                <div>
                  <h5>{event.name}</h5>
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
                  <h5>{event.name}</h5>
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