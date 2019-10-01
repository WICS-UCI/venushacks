import React from "react";
import './Home.scss';

import { Button } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';

import { NumbersGroup } from 'app/containers';
import logo from 'assets/images/zothacks-logo.png';
import background from 'assets/images/clouds-background.jpg';
import mobileBackground from 'assets/images/clouds-mobile-background.png';

function Home() {
  return (
    <div className="Home">
      <img id='background' src={background}></img>
      <img id="mobile-background" src={mobileBackground}></img>
      <section id='intro'>
        <div className="title-info">
          <Fade duration={3000}>
            <img src={logo}></img>
            <div>
              <h1>
                ZotHacks
              </h1>
              <h4>
               November 9-10th
              </h4>
              <p className="title-info-description">
                A beginner-oriented hackathon for UCI anteaters.
              </p>
              <a href="https://tinyurl.com/zothacks2019">
              <Button variant='light' style={{'borderRadius': '50px', width: '100px'}}>
                Apply
              </Button>
              </a>
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
              We at Hack are excited to announce ZotHacks, our beginner-focused mini-hackathon, which will be taking place on November 9th and 10th 2019.
            </p>
            <p>
              ZotHacks is a beginner-friendly hackathon where students with minimal computer science experience will learn to build and build a full-stack web application. Through ZotHacks, we introduce these students to the world of hackathons and web development by providing technical workshops, strong mentorship, and free food!
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
                  <h4>0 to 100</h4>
                  <p>
                    44 hackers with little to no web development experience learned something!
                  </p>
                </NumbersGroup>
              </div>
              <div>
                <NumbersGroup>
                  <i className="fa fa-check"></i>
                  <h4>Completion</h4>
                  <p>
                    10/11 teams (90.9%) completed a project by the end of the 10 hour hacking period.
                  </p>
                </NumbersGroup>
              </div>
              <div>
                <NumbersGroup>
                  <i className="fa fa-smile-o"></i>
                  <h4>Fun!</h4>
                  <p>
                    <a style={{'color': '#2c0052'}} target="_blank" href="https://www.youtube.com/watch?v=ziDx-n3ffmk">Lasse</a> personally tracked down and asked every participant if they had fun. They said yes!
                  </p>
                </NumbersGroup>
              </div>
            </div>
          </Fade>
        </div>
      </section>
      <section id='faq'>
        <Fade duration={1000}>
          <h2>
            FAQ
          </h2>
          <div className="faq-grid">
            <div/>
            <div id="faq-left">
              <h3>
                What is ZotHacks              
              </h3>
              <p>
                ZotHacks is a place where the only thing limiting what you build is your own creativity – we'll provide the rest. We give you the resources, training, mentorship, and food you need in order for you to build a full web application with a team.
              </p>
              <h3>
                What should I bring?            
              </h3>
              <p>
                Yourself, an idea, a photo ID, your laptop, and chargers. We also have a list of the required software to download on laptops prior to the hackathon that we will send out later as the hackathon draws near.
              </p>
              <h3>
                How will team formations work for admitted students?         
              </h3>
              <p>
                We will be helping with team formations prior to the event and creating a Slack channel for communicating. Teams will be up to 4 people with an assigned mentor.
              </p>
              <h3>
                What if I have no prior experience in programming, coding, or hackathons?       
              </h3>
              <p>
                We don’t expect hackers to have any prior experience. We will be providing starter packs and workshops to help new hackers get started on projects and learn new technologies.
              </p>
            </div>
            <div/>
            <div id="faq-right">
              <h3>
                Who should attend
              </h3>
              <p>
                If you do not know much or anything about web development but are interested in learning how to build web apps, you are the ideal candidate for ZotHacks. This year, we would like only first and second years of UCI to be attendees; for those who are transfers or third years and up, consider applying to be a mentor!
              </p>
              <h3>
                Do I sign up as a team or individual?
              </h3>
              <p>
                You will apply as an individual. We will be personally reviewing each application and accepting on an individual basis.
              </p>
              <h3>
                Are there swag and food? sponsors, swag, and food?          
              </h3>
              <p>
                Of course! Get hyped!
              </p>
              <h3>
                Am I allowed to come with a project pre-built or will I be building the project from scratch?
              </h3>
              <p>
                You will be building projects from scratch, although we will be offering starter packs to help you get started. You are encouraged to come with ideas of what you want to build.
              </p>
              
            </div>
            <div/>
          </div>
        </Fade>
      </section>
      <section id="credits">
        <p>Made with <a href="https://en.wikipedia.org/wiki/Anteater">&hearts;</a> in Irvine, CA</p>
      </section>
    </div>
  );
}

export default Home;
