import React from "react";
import './Home.scss';

import { Button } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';

import { NumbersGroup } from 'app/containers';
// import logo from 'assets/images/zothacks-logo.png';
import logo from 'assets/images/logo_solid.png';
import astronaut from 'assets/images/astronaut_with_laptop.png';
// import background from 'assets/images/clouds-background.jpg';
import background_2 from 'assets/images/hat.png';
import mobileBackground from 'assets/images/background.png';

import periwinkle_planet from 'assets/images/periwinkleplanet.png';
import about from 'assets/images/about.png';
import faq from 'assets/images/faq.png';

// SPONSORS
import spponsors_pic from 'assets/images/sponsors.png';
import ucibren from 'assets/images/sponsors/ucibren.png';
import disney from 'assets/images/sponsors/disney.png';
import crowdstrike from 'assets/images/sponsors/crowdstrike.png';
import informatics from 'assets/images/sponsors/informatics.png';
import google from 'assets/images/sponsors/google.png';
import oracle from 'assets/images/sponsors/oracle.png';

function Home() {
  return (
    <div className="Home">
      {/* <img id='background' src={background_2}></img> */}
      {/* <img id="mobile-background" src={mobileBackground}></img> */}
      <section id='intro'>
        <div className="title-info">
          <Fade duration={3000}>
            <div id="astronaut">
              <img id="left-image" src={astronaut}></img>
            </div>
            
            <div>
              <h1>
                VENUSHACKS
              </h1>
              <h4>
               May 23-24, 2020
              </h4>
              <p className="title-info-description">
                UC Irvine's first women-centric* hackathon
              </p>

              {/* <a href="https://tinyurl.com/zothacks2019"> */}
              <a>
              <Button disabled variant='light' style={{'borderRadius': '50px', width: '200px'}}>
                Applications open March 23, 2020
              </Button>
              </a>
            </div>
            <img id= "right-image" src={logo}></img>
          </Fade>
        </div>
      </section>
      <section id='info'>
        <div>
          <Fade duration={1000}>
          <img src={about}></img>
            {/* <h2>
              What is VenusHacks?
            </h2> */}
            <p>
            Planned in collaboration with <a href="https://wics.ics.uci.edu/" target="_blank">WICS</a> and <a href="https://www.hackuci.com/" target="_blank">Hack</a>, VenusHacks will be taking place from May 23-24, 2020 and is UCI’s first women-centric* hackathon.
            </p>
            <p>
            Our mission is to empower underrepresented groups by providing an inclusive community to foster growth and creativity in computing. VenusHacks will be open to participants of all experience levels, as we aim to increase diversity in tech through support, exposure, and community. Join us as we welcome over 200 high school (18+) and UCI students to participate in our 24-hour event that includes networking, fun activities, educational workshops, and lots of coding!
            </p>
            <p className="asterisk-inclusive">*trans and non-binary inclusive</p>
          </Fade>
        </div>
      </section>
      {/* <section id='numbers'>
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
      </section> */}
      <section id='faq'>
        <Fade duration={1000}>
        <img src={faq}></img>
          {/* <h2>
            FAQ
          </h2> */}
          <div className="faq-grid">
            <div/>
            <div id="faq-left">
              <h3>
                What is a hackathon?              
              </h3>
              <p>
                A hackathon is a 24 hour event where students of different backgrounds come together to collaborate on a project. Teams of up to 4 work together on brainstorming an idea and bringing the technology to life, and may present the project to possibly win some awesome prizes! You can also attend workshops, hear from inspiring speakers, and network with company representatives and fellow hackers.
              </p>
              <h3>
                Can high schoolers attend? 
              </h3>
              <p>
                Yes! However, you must be at least 18 years old at the time of the hackathon to attend. 
              </p>
              <h3>
                What should I bring?            
              </h3>
              <p>
                An open mind, laptop, charger, government-issued ID, toiletries, sleeping bag, and anything else you would need to hack! Note: There will be no showers at the event.
              </p>
              <h3>
                Do I sign up as an individual or as a team?
              </h3>
              <p>
                Individual. We will be accepting applicants on an individual basis. Those accepted can form teams before the hackathon (i.e. via our Slack channel) or during team formation at the start of the hackathon!               </p>
              <h3>
                When are applications released and when are they due?
              </h3>
              <p>
                We will release hacker applications on March 23rd, 2020 and they will be due on April 19, 2020. Volunteer and mentor applications will be released on April 27th, 2020. 
              </p>
            </div>
            <div/>
            <div id="faq-right">
              <h3>
                Who can participate?
              </h3>
              <p>
                We hope this event inspires and highlights those identifying as women or non-binary to hack, and we encourage our allies to participate as mentors and volunteers to support! At this time, we are only accepting UCI undergraduate or graduate students and high school students 18 years old and up.
              </p>
              <h3>
                Does this event cost money to attend?
              </h3>
              <p>
                No, the event is free! We will also be providing food and snacks throughout the weekend, as well as swag.
              </p>
              <h3>
                What if I have no experience?
              </h3>
              <p>
                Perfect! We welcome hackers of all experience levels and backgrounds. We will be providing resources and workshops to help new hackers get started on projects and learn new technologies. There will also be mentors at the event to help guide you!
              </p>
              <h3>
                Can I come with a project pre-built or will I have to build from scratch?
              </h3>
              <p>
                You will be building your project from scratch. However, feel free to come with ideas of what you want to build!
              </p>
              {/* <h3>
                Are there travel reimbursements?
              </h3>
              <p>
                i think so but kayla can't remember lol
              </p> */}
              <h3>
                How do I get hyped?
              </h3>
              <p>
                Follow our Facebook page: @venushacksUCI and our Instagram: @venushacks_uci for important updates!
              </p>
              
            </div>
            <div/>
          </div>
        </Fade>
      </section>
      <section id="sponsors">
        <Fade duration={1000}>
          <img src={spponsors_pic}></img>
          <div id="sponsors-grid">
            <img src={ucibren}></img>
            <img src={disney}></img>
            <img style={{background: '#002143', padding: '15px 8px'}} src={informatics}></img>
            <img src={crowdstrike}></img>
            <img style={{width: '300px'}} src={google}></img>
            <img src={oracle}></img>
          </div>
          <p style={{fontSize: '30px'}}>+ more to come!</p>
          <p style={{marginBottom: '100px'}}>Join our movement, contact us <a href="mailto:venushacks.corporate@gmail.com" target="_top">here</a>.</p>
        </Fade>
      </section>
      <section id="credits">
        {/* <p>Made with <a href="https://en.wikipedia.org/wiki/Anteater">&hearts;</a> in Irvine, CA</p> */}
      </section>
    </div>
  );
}

export default Home;
