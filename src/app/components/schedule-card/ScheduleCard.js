import React from 'react';
import './ScheduleCard.scss';

const satSchedule = [
  {
    name: 'Team Formation',
    link: 'https://uci.zoom.us/j/92221155593',
    description: 'Meet fellow hackers!',
    time: '9:00AM-10:00AM'
  },
  {
    name: 'Opening Ceremony',
    description: 'Getting started',
    time: '10:00AM-11:00AM'
  },
  {
    name: 'Tech for Good Panel',
    description: 'Change.org, LaunchCode, Nina Space',
    time: '11:00AM-12:00PM'
  },
  {
    name: 'Hacking Begins',
    description: 'Blast-off!',
    time: '12:00PM'
  },
  {
    name: 'Intro to Web Dev',
    description: 'WICS',
    time: '12:00PM-1:00PM'
  },
  {
    name: 'iOS Development',
    description: 'CodePath',
    time: '12:00PM-1:00PM'
  },
  {
    name: 'Intro to UI/UX Design',
    description: 'Design at UCI',
    time: '1:00PM-2:00PM'
  },
  {
    name: 'Disney Tech Talk',
    description: 'Disney',
    time: '2:00PM-3:00PM'
  },
  {
    name: 'Android Development',
    description: 'CodePath',
    time: '3:00PM-4:00PM'
  },
  {
    name: 'APIs 101 Workshop',
    description: 'Postman',
    time: '4:00PM-5:00PM'
  },
  {
    name: 'The Unity Game Engine',
    description: 'VGDC',
    time: '5:00PM-6:00PM'
  },
  {
    name: 'Cyber Security Challenge',
    description: 'MLH',
    time: '5:30PM-6:00PM'
  },
  {
    name: 'GraphQL Workshop',
    description: 'ICSSC',
    time: '6:00PM-7:00PM'
  },
  {
    name: 'Supervised Learning with Online Datasets Workshop',
    description: 'AI@UCI',
    time: '7:00PM-8:00PM'
  },
  {
    name: 'Bob Ross Painting Event',
    description: 'Let\'s get creative!',
    time: '7:30PM-8:00PM'
  },
  {
    name: 'Imposter Syndrome',
    description: 'SWE',
    time: '8:00PM-9:00PM'
  },
  {
    name: 'binarysearch',
    description: 'Let\'s do some coding!',
    time: '9:00PM-10:00PM'
  },
  {
    name: 'How to Pitch Your Hackathon Project',
    description: 'MAISS',
    time: '10:00PM-11:00PM'
  },
]

const sunSchedule = [
  {
    name: 'Hacking Ends',
    description: 'Landing!',
    time: '12:00PM'
  },
  {
    name: 'Diversity in Tech Panel',
    description: 'Linode, Darktrace, Procure Technologies',
    time: '2:00PM-3:00PM'
  },
  {
    name: 'Drawphone',
    description: 'Let\'s have some fun!',
    time: '5:30PM-6:00PM'
  },
  {
    name: 'Closing Ceremony',
    description: 'See you next year!',
    time: '6:00PM-7:00PM'
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
                  <h5 href={event.link}> {event.name}</h5>
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