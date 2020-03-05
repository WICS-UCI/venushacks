import React from "react";
import { Button } from 'react-bootstrap';
import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons'
import './Home.scss';

import FAQs from '../../components/faqs/FAQs';
import Footer from '../../components/footer/Footer';
import Team from '../../components/meet-team/team';

// TITLES
import vh_title from 'assets/images/titles/vh_title.png';
import about_title from 'assets/images/titles/about-cropped.png';
import faq_title from 'assets/images/titles/faq-cropped.png';
import sponsors_title from 'assets/images/titles/sponsors-cropped.png';
import meet_team_title from 'assets/images/titles/meettheteam-cropped.png';

// PARALLAX ASSETS
import starsBackground from 'assets/images/stars-background.svg';
import periwinkle_planet from 'assets/images/periwinkleplanet.png';
import pink_planet from 'assets/images/pinkplanet.png';
import constellation1 from 'assets/images/constellation1.png';
import constellation2 from 'assets/images/constellation2.png';
import constellation3 from 'assets/images/constellation3.png';
import constellation4 from 'assets/images/constellation4.png';

// SPONSORS
import ucibren from 'assets/images/sponsors/ucibren.png';
import disney from 'assets/images/sponsors/disney.png';
import crowdstrike from 'assets/images/sponsors/crowdstrike.png';
import informatics from 'assets/images/sponsors/informatics.png';
import google from 'assets/images/sponsors/google.png';
import oracle from 'assets/images/sponsors/oracle.png';
import balsamiq from 'assets/images/sponsors/balsamiq1.png';
import corelogic from 'assets/images/sponsors/corelogic.jpg';


export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { contentHeight: 8 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);

    setTimeout(() => {
      this.updateWindowDimensions()
    }, 400);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    if (this._element && this._element.clientHeight) {
      let contentHeight = this._element.clientHeight/window.innerHeight
      this.setState({ contentHeight: contentHeight });
    }
  }

  render() {
    return (
      <div className="Home">

        <Parallax 
          ref={ref => (this.parallax = ref)}
          pages={2+this.state.contentHeight}
          style={{ backgroundImage: `url(${starsBackground})`, backgroundSize: 'cover'}}
        >

          {/* INTRO **********************/}
          <ParallaxLayer id="intro" offset={0} speed={0.1}>
            <div id="intro-grid">
              <div id="astronaut-wrapper">
                <div id="astronaut" />
                <div id="laptop" />
              </div>

              <div id="intro-info-wrapper">
                <img id="venushacks-title" src={vh_title} />
                <h4 id="date">May 23-24, 2020</h4>
                <p id="tagline">UC Irvine's first women-centric* hackathon</p>
                <Button id="applications-btn" disabled variant='light'>
                  Applications open March 23, 2020
                </Button>
              </div>
            </div>
          </ParallaxLayer>

          {/* LEFT CONSTELLATION */}
          <ParallaxLayer className="parallax-asset" offset={1.3} speed={-0.1} style={{ pointerEvents: 'none' }}>
            <img src={constellation3} style={{ width: '22%', height: 'auto', marginRight: '80%' }} />
          </ParallaxLayer>

          {/* UPPER-RIGHT CONSTELLATION */}
          <ParallaxLayer className="parallax-asset" offset={1.2} speed={-0.1} style={{ pointerEvents: 'none' }}>
            <img src={constellation1} style={{ width: '25%', height: 'auto', marginLeft: '80%' }} />
          </ParallaxLayer>

          {/* LOWER-RIGHT CONSTELLATION */}
          <ParallaxLayer className="parallax-asset" offset={1.6} speed={-0.2} style={{ pointerEvents: 'none' }}>
            <img src={constellation2} style={{ width: '20%', height: 'auto', marginLeft: '80%' }} />
          </ParallaxLayer>

          {/* UPPER-LEFT PLANET */}
          <ParallaxLayer className="parallax-asset" offset={2.05} speed={-0.1} style={{ pointerEvents: 'none' }}>
            <img src={pink_planet} style={{ width: '10%', height: 'auto', marginRight: '80%' }} />
          </ParallaxLayer>

          {/* LOWER-RIGHT PLANET */}
          <ParallaxLayer className="parallax-asset" offset={2.65} speed={-0.1} style={{ pointerEvents: 'none' }}>
            <img src={periwinkle_planet} style={{ width: '10%', height: 'auto', marginLeft: '80%' }} />
          </ParallaxLayer>

          {/* ABOUT **********************/}
          <ParallaxLayer id='about' offset={1} speed={0.1}>
            <img src={about_title}></img>
            <div id="about-wrapper">
              <p>
                Planned in collaboration with&nbsp;
                <a href="https://wics.ics.uci.edu/" target="_blank" rel="noopener noreferrer">WICS</a> and&nbsp;
                <a href="https://www.hackuci.com/" target="_blank" rel="noopener noreferrer">Hack</a>,&nbsp;
                VenusHacks will be taking place from May 23-24, 2020 and is UCI’s 
                first women-centric* hackathon.
              </p>
              <p>
                Our mission is to empower underrepresented groups by providing an 
                inclusive community to foster growth and creativity in computing. 
                VenusHacks will be open to participants of all experience levels, as 
                we aim to increase diversity in tech through support, exposure, and 
                community. Join us as we welcome over 200 high school (18+) and UCI 
                students to participate in our 24-hour event that includes networking, 
                fun activities, educational workshops, and lots of coding!
              </p>
              <p className="asterisk-inclusive">*trans and non-binary inclusive</p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={2}>
            <div ref={ref => {this._element = ref}}>
              {/* FAQ ************************/}
              <div id="faq">
                <img src={faq_title}></img>
                <FAQs></FAQs>
                <p className="faq-contact-us">
                  Additional logistic questions? Contact us&nbsp;
                  <a href="mailto:venushacks.uci@gmail.com" target="_top">
                    venushacks.uci@gmail.com
                  </a>.
                </p>
              </div>

              {/* SPONSORS **********************/}
              <div id="sponsors">
                  <img className="title" src={sponsors_title}></img>
                  <div id="sponsors-white-box">
                    <div className="logo large">
                      <a href="https://www.ics.uci.edu/" target="_blank" rel="noopener noreferrer">
                        <img src={ucibren}/>
                      </a>
                      <a href="https://jobs.disneycareers.com/technology" target="_blank" rel="noopener noreferrer">
                        <img src={disney}/>
                      </a>
                      <a href="https://www.informatics.uci.edu/" target="_blank" rel="noopener noreferrer">
                        <img src={informatics} style={{background: '#002143', padding: '15px 8px'}} />
                      </a>
                    </div>
                    <div className="logo medium">
                      <a href="https://balsamiq.com/" target="_blank" rel="noopener noreferrer">
                        <img src={balsamiq}/>
                      </a>
                      <a href="https://www.crowdstrike.com/careers/university-interns/" target="_blank" rel="noopener noreferrer">
                        <img src={crowdstrike} />
                      </a>
                      <a href="https://www.oracle.com/corporate/careers/students-grads/" target="_blank" rel="noopener noreferrer">
                        <img src={oracle}/>
                      </a>
                      <a href="https://www.corelogic.com/about-us/internships.aspx" target="_blank" rel="noopener noreferrer">
                        <img id="corelogic" src={corelogic} />
                      </a>
                      <a href="https://careers.google.com/students/" target="_blank" rel="noopener noreferrer">
                        <img id="google" src={google} />
                      </a>
                    </div>
                    <div className="more-to-come-text">
                      <span className="plus">+</span>
                      <span style={{verticalAlign: "text-top"}}>
                        more to come!
                      </span>
                    </div>
                  </div>
                  <p className="sponsor-contact-us">
                    Join our movement, contact us&nbsp;
                    <a href="mailto:venushacks.corporate@gmail.com" target="_top">
                      venushacks.corporate@gmail.com
                    </a>.
                  </p>
              </div>

              {/* MEET THE TEAM ******************/}
              <div id="meet-team">
                <img src={meet_team_title}></img>
                <Team/>
              </div>
              <Footer/>
              
            </div>
          </ParallaxLayer>
        </Parallax>
      </div>
    )
  }
}
