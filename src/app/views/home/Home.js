import React from "react";
import './Home.scss';

import { Button } from 'react-bootstrap';
import { NumbersGroup } from 'app/containers';
import logo from 'assets/images/zothacks-logo.png';
import Fade from 'react-reveal/Fade';

function Home() {
  return (
    <div className="Home">
      <div className="stripes">
        <div className='inner0'></div>
        <div className='inner1'></div>
        <div className='inner2'></div>
        <div className='inner3'></div>
      </div>
      <section id='intro'>
        <div>
          <Fade duration={2000}>
            <img src={logo}></img>
            <div>
              <h1>
                ZotHacks
              </h1>
              <p>
                A beginner-oriented hackathon for UCI anteaters.
              </p>
              <Button variant='outline-light' style={{'borderRadius': '50px'}}>
                Apply
              </Button>
            </div>
          </Fade>
        </div>
      </section>
      <section id='info'>
        <div>
          <Fade duration={1000}>
            <h2>
              Why ZotHacks?
            </h2>
            <p>
              We at Hack are excited to announce ZotHacks, our beginner-focused mini-hackathon, which will be taking place on November 17, 2018.
            </p>
            <p>
              Hackathons can be pretty intimidating for beginner hackers. We hope that we can provide a gentle introduction for hackathons and creating meaningful projects. During the day, you will have constant help from mentors, technical and professional workshops, and of course, FREE FOOD.
            </p>
          </Fade>
        </div>
      </section>
      <section id='numbers'>
        <h2>
          ZotHacks by the Numbers
        </h2>
        <div>
          <Fade bottom cascade duration={1000}>
            <div className="numbers-cards">
              <div>
                <NumbersGroup>
                  <i className="fa fa-line-chart"></i>
                  <h3>0 to 100</h3>
                  <p>
                  A majority of ZotHacks 2019 participants started with no experience but still learned something!
                  </p>
                </NumbersGroup>
              </div>
              <div>
                <NumbersGroup>
                  <i className="fa fa-check"></i>
                  <h3>Project Completion</h3>
                  <p>
                    95.425% of participants completed a project by the end of the 10 hour hacking period.
                  </p>
                </NumbersGroup>
              </div>
              <div>
                <NumbersGroup>
                  <i className="fa fa-smile-o"></i>
                  <h3>Fun!</h3>
                  <p>
                    Lasse personally tracked down and asked every participant if they had fun. They said yes!
                  </p>
                </NumbersGroup>
              </div>
            </div>
          </Fade>
        </div>
      </section>
      <section id="credits">
        <p>Made with <a href="https://en.wikipedia.org/wiki/Anteater">&hearts;</a> in Irvine, CA</p>
      </section>
    </div>
  );
}

export default Home;
