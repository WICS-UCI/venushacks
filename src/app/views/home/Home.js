import React from "react";
import { Button } from 'react-bootstrap';
import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons'
import './Home.scss';

import FAQs from '../../components/faqs/FAQs';
import Footer from '../../components/footer/Footer';
import Team from '../../components/meet-team/team';

// TITLES
import vh_title from 'assets/images/titles/vh_title.png';
import about_title from 'assets/images/titles/about.png';
import faq_title from 'assets/images/titles/faq.png';
import sponsors_title from 'assets/images/titles/sponsors.png';
import meet_team_title from 'assets/images/titles/meettheteam.png';

// PARALLAX ASSETS
import stars_background from 'assets/images/stars-background.svg';
import periwinkle_planet from 'assets/images/periwinkleplanet.png';
import pink_planet from 'assets/images/pinkplanet.png';
import constellation1 from 'assets/images/constellation1.png';
import constellation2 from 'assets/images/constellation2.png';
import constellation3 from 'assets/images/constellation3.png';
// import constellation4 from 'assets/images/constellation4.png';

// SPONSORS
import ucibren from 'assets/images/sponsors/ucibren.png';
import disney from 'assets/images/sponsors/disney.png';
import crowdstrike from 'assets/images/sponsors/crowdstrike.png';
import balsamiq from 'assets/images/sponsors/balsamiq.png';
// import informatics from 'assets/images/sponsors/informatics.png';
// import oracle from 'assets/images/sponsors/oracle.png';
// import corelogic from 'assets/images/sponsors/corelogic.jpg';
// import linode from 'assets/images/sponsors/linode.png';
// import google from 'assets/images/sponsors/google.png';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      /* Number of "pages" needed to contain all content under 
         the about section (faqs, sponsors, meet team, etc).
         This number is calculated in updateParallaxLayerHeight().
      */
      contentHeight: 8
    };
    this.updateParallaxLayerHeight = this.updateParallaxLayerHeight.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateParallaxLayerHeight);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateParallaxLayerHeight);
  }
  
  /**
   * Calculates number of pages that all content under 
   * the about section (faqs, sponsors, meet team, etc) 
   * needs and updates this parallax layer
   */
  updateParallaxLayerHeight() {
    if (this._element && this._element.clientHeight) {
      let contentHeight = this._element.clientHeight/window.innerHeight
      this.setState({ contentHeight: contentHeight });
    }
  }

  /**
   * Used to remove floating effect of hero & about 
   * sections on smaller screens
   */
  isMobileScreen() {
    return window.innerWidth <= 500;
  }

  /**
   * Renders sponsor logo that links to sponsor page
   * @param {*} imgId id of image used for custom css styles
   * @param {*} imgSrc source of image import
   * @param {*} url link to sponsor page
   */
  renderSponsorLink(imgId, imgSrc, url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img 
          id={imgId} 
          className="logo"
          src={imgSrc} 
          alt={"Sponsor: " + imgId}
          // needed to resize parallax layer as each image loads
          onLoad={this.updateParallaxLayerHeight}
        />
      </a>
    )
  }

  render() {
    /**
     * There are 3 main parallax layers: 
     * (1) hero section
     * (2) about section
     * (3) all other sections
     * 
     * (1) and (2) take up one "page" each, where each page
     * is equal to 100vh. All other sections are put into
     * 1 parallax layer since each sections' number of pages vary
     * depending on screen size and if faqs are open. Putting (3)
     * into 1 parallax layer also prevents sections from overlapping.
     */
    return (
      <div className="Home">

        <Parallax 
          ref={ref => (this.parallax = ref)}
          pages={2+this.state.contentHeight}
          style={{ backgroundImage: `url(${stars_background})`, backgroundSize: 'cover'}}
        >

          {/* HERO **********************/}
          <ParallaxLayer offset={0} speed={this.isMobileScreen() ? null : 0.1}>
            <section id="hero">

                <div id="astronaut-animation">
                  {/* These assets are a background of a div instead of imgs to prevent 
                      them from being able to be saved to camera roll on iOS */}
                  <div id="astronaut" />
                  <div id="laptop" />
                </div>

                <div id="hero-right">
                  <img id="venushacks-title" src={vh_title} alt="VenusHacks Title Logo"/>
                  <h4 id="date">April 24 - 25, 2021</h4>
                  <p id="tagline">UC Irvine's first women-centric hackathon</p>
                    <Button id="apply-btn">
                      <a href="https://airtable.com/shrCdPWeLmyfxrKvT" style={{ color: "#99a6e5"}}>
                        HACKER APP
                      </a>
                    </Button>
                    <Button id="apply-btn">
                      <a href="https://airtable.com/shrleZ2rcEiyrnE0f" style={{ color: "#b299e5" }}>
                        MENTOR APP
                      </a>
                    </Button>
                </div>

            </section>
          </ParallaxLayer>

          {/* LEFT CONSTELLATION */}
          <ParallaxLayer className="parallax-asset" offset={1.3} speed={-0.1} style={{ pointerEvents: 'none' }}>
            <img src={constellation3} alt="constellation icon" style={{ width: '22%', height: 'auto', marginRight: '80%' }} />
          </ParallaxLayer>

          {/* UPPER-RIGHT CONSTELLATION */}
          <ParallaxLayer className="parallax-asset" offset={1.2} speed={-0.1} style={{ pointerEvents: 'none' }}>
            <img src={constellation1} alt="constellation icon" style={{ width: '25%', height: 'auto', marginLeft: '80%' }} />
          </ParallaxLayer>

          {/* LOWER-RIGHT CONSTELLATION */}
          <ParallaxLayer className="parallax-asset" offset={1.6} speed={-0.2} style={{ pointerEvents: 'none' }}>
            <img src={constellation2} alt="constellation icon" style={{ width: '20%', height: 'auto', marginLeft: '80%' }} />
          </ParallaxLayer>

          {/* UPPER-LEFT PLANET */}
          <ParallaxLayer className="parallax-asset" offset={2.02} speed={-0.1} style={{ pointerEvents: 'none' }}>
            <img src={pink_planet} alt="pink planet icon" style={{ width: '10%', height: 'auto', marginRight: '80%' }} />
          </ParallaxLayer>

          {/* LOWER-RIGHT PLANET */}
          <ParallaxLayer className="parallax-asset" offset={2.65} speed={-0.1} style={{ pointerEvents: 'none' }}>
            <img src={periwinkle_planet} alt="periwinkle planet icon" style={{ width: '10%', height: 'auto', marginLeft: '80%' }} />
          </ParallaxLayer>

          {/* ABOUT **********************/}
          <ParallaxLayer offset={1} 
            speed={this.isMobileScreen() ? null : 0.1}
          >
            <section id="about">
              <img className="section-title" src={about_title} alt="About"/>
              <div id="about-text-container">
                <p>
                  Planned in collaboration with&nbsp;
                  <a href="https://wics.ics.uci.edu/" target="_blank" rel="noopener noreferrer">WICS</a> and&nbsp;
                  <a href="https://hack.ics.uci.edu/" target="_blank" rel="noopener noreferrer">Hack at UCI</a>,&nbsp;
                  VenusHacks will be UCI’s 
                  first women-centric hackathon and will take place all online! 
                </p>
                <p>
                  Our mission is to empower underrepresented groups by providing an 
                  inclusive community to foster growth and creativity in computing. 
                  VenusHacks will be open to participants of all experience levels, as 
                  we aim to increase diversity in tech through support, exposure, and 
                  community. Join us as we welcome high school (18+), undergraduate, and 
                  graduate students to participate in our 24-hour event that includes networking, 
                  fun activities, educational workshops, and lots of coding!
                </p>
              </div>
            </section>
          </ParallaxLayer>

          <ParallaxLayer offset={2}>
            <div ref={ref => {this._element = ref}}>

              {/* FAQ ************************/}
              <section id="faq">
                <img className="section-title" src={faq_title} alt="FAQ" />
                <FAQs/>
                <p id="faq-contact-us">
                  Additional logistic questions? Contact us&nbsp;
                  <a href="mailto:venushacks.uci@gmail.com" target="_top">
                    venushacks.uci@gmail.com
                  </a>.
                </p>
              </section>

              {/* SPONSORS **********************/}
              <section id="sponsors">
                  <img className="section-title" src={sponsors_title} alt="Sponsor" />
                  <div id="sponsors-container">
                    <div className="logo-wrapper large">
                      {this.renderSponsorLink("ucibren", ucibren, "https://www.ics.uci.edu/")}
                      {this.renderSponsorLink("disney", disney, "https://jobs.disneycareers.com/technology")}
                      {/* {this.renderSponsorLink("informatics", informatics, "https://www.informatics.uci.edu/")} */}
                    </div>
                    <div className="logo-wrapper medium">
                      {this.renderSponsorLink("balsamiq", balsamiq, "https://balsamiq.com/company/jobs/")}
                      {this.renderSponsorLink("crowdstrike", crowdstrike, "https://www.crowdstrike.com/careers/university-interns/")}
                      {/* {this.renderSponsorLink("oracle", oracle, "https://www.oracle.com/corporate/careers/students-grads/")}
                      {this.renderSponsorLink("corelogic", corelogic, "https://www.corelogic.com/about-us/internships.aspx")}
                      {this.renderSponsorLink("linode", linode, "https://www.linode.com/company/careers/")}
                      {this.renderSponsorLink("google", google, "https://careers.google.com/students/")} */}
                    </div>

                    <div id="sponsors-more-to-come">
                      <span className="plus-icon">+</span>
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
              </section>

              {/* MEET THE TEAM ******************/}
              <section id="meet-team">
                <img className="section-title" src={meet_team_title} alt="Meet the Team" />
                <Team/>
              </section>
              
            </div>
          </ParallaxLayer>
        
          {/* FOOTER ******************/}
          <Footer/>
          
        </Parallax>

        
      </div>
    )
  }
}
