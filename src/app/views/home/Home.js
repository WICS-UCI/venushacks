import React from "react";
import './Home.scss';

import { Button } from 'react-bootstrap';
import { NumbersGroup } from 'app/containers';

function Home() {
  return (
    <div className="Home">
      <div className="stripes">
          <div class='inner0'></div>
          <div class='inner1'></div>
          <div class='inner2'></div>
          <div class='inner3'></div>
      </div>
      <section id='intro'>
        <div>
          <h1>
            ZotHacks
          </h1>
          <p>
            A beginner-oriented hackathon for UCI anteaters.
          </p>
          <Button variant='outline-light'>
            Apply
          </Button>
        </div>
      </section>
      <section id='info'>
        <div>
          <h2>
            Why ZotHacks?
          </h2>
          <p>
            We at Hack are excited to announce ZotHacks, our beginner-focused mini-hackathon, which will be taking place on November 17, 2018.
          </p>
          <p>
            Hackathons can be pretty intimidating for beginner hackers. We hope that we can provide a gentle introduction for hackathons and creating meaningful projects. During the day, you will have constant help from mentors, technical and professional workshops, and of course, FREE FOOD.
          </p>
        </div>
      </section>
      <section id='numbers'>
        <h2>
          ZotHacks by the Numbers
        </h2>
        <div>
          <NumbersGroup>
            <h3>0 to 100</h3>
            <p>
             A majority of ZotHacks 2019 participants started with no experience but still learned something!
            </p>
          </NumbersGroup>
          <NumbersGroup>
            <h3>Project Completion</h3>
            <p>
              95.425% of participants completed a project by the end of the 10 hour hacking period.
            </p>
          </NumbersGroup>
          <NumbersGroup>
            <h3>Fun!</h3>
            <p>
              Lasse personally tracked down and asked every participant if they had fun. They said yes!
            </p>
          </NumbersGroup>
        </div>
      </section>
    </div>
  );
}

export default Home;
