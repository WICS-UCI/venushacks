import React from "react";
import './Home.scss';

import { Button } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';

import FAQs from '../../components/faqs/FAQs';
import Team from '../../components/meet-team/team';

import venushacks_logo from 'assets/images/logo_solid.png';
import astronaut from 'assets/images/astronaut_with_laptop.png';

import periwinkle_planet from 'assets/images/periwinkleplanet.png';
import about_title from 'assets/images/about.png';
import faq_title from 'assets/images/faq.png';
import meet_team_title from 'assets/images/meettheteam-cropped.png';

// SPONSORS
import sponsors_title from 'assets/images/sponsors.png';
import ucibren from 'assets/images/sponsors/ucibren.png';
import disney from 'assets/images/sponsors/disney.png';
import crowdstrike from 'assets/images/sponsors/crowdstrike.png';
import informatics from 'assets/images/sponsors/informatics.png';
import google from 'assets/images/sponsors/google.png';
import oracle from 'assets/images/sponsors/oracle.png';

function Home() {
  return (
    <div className="Home">

      {/* INTRO **********************/}
      <section id='intro'>
        <div className="title-info">
          <Fade duration={3000}>
            <img id="astronaut-img" src={astronaut} />
            
            <div>
              <h1 id="venushacks-title">
                VENUSHACKS
              </h1>
              <h4>
               May 23-24, 2020
              </h4>
              <p className="title-info-description">
                UC Irvine's first women-centric* hackathon
              </p>
              <a>
              <Button disabled variant='light' style={{'borderRadius': '50px', width: '200px'}}>
                Applications open March 23, 2020
              </Button>
              </a>
            </div>
            <img id= "venushacks-logo" src={venushacks_logo}></img>
          </Fade>
        </div>
      </section>

      {/* ABOUT ***********************/}
      <section id='info'>
        <div>
          <Fade duration={1000}>
          <img src={about_title}></img>
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

      {/* FAQS ************************/}
      <section id='faq'>
        <Fade duration={1000}>
          <img src={faq_title}></img>
          <FAQs></FAQs>
          <p className="faq-contact-us">
            Additional logistic questions? Contact us <a href="mailto:venushacks.uci@gmail.com" target="_top">venushacks.uci@gmail.com</a>.
          </p>
        </Fade>
      </section>

      {/* SPONSORS ********************/}
      <section id="sponsors">
        <Fade duration={1000}>
          <img src={sponsors_title}></img>
          <div id="sponsors-wrapper">

            <div id="sponsors-grid">
              <img src={ucibren}/>
              <img src={disney}/>
              <img src={informatics} style={{background: '#002143', padding: '15px 8px'}} />
              <img src={crowdstrike}/>
              <img src={google} style={{width: '250px', height:'75px'}} />
              <img src={oracle}/>
            </div>
            <div className="more-to-come-text">
              <span className="plus">+</span>
              <span style={{verticalAlign: "text-top"}}>
                more to come!
              </span>
            </div>
          </div>
          <p className="sponsor-contact-us">
            Join our movement, contact us <a href="mailto:venushacks.corporate@gmail.com" target="_top">venushacks.corporate@gmail.com</a>.
          </p>
        </Fade>
      </section>

      {/* MEET THE TEAM ********************/}
      <section id="meet-team">
        {/* <Fade duration={1000}> */}
          <img src={meet_team_title}></img>
          <Team></Team>
        {/* </Fade> */}
      </section>

      <section id="credits">
        {/* <p>Made with <a href="https://en.wikipedia.org/wiki/Anteater">&hearts;</a> in Irvine, CA</p> */}
      </section>
    </div>
  );
}

export default Home;
