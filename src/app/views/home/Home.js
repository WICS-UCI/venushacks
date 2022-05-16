import React from "react";
import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons'
import './Home.scss';

import FAQs from '../../components/faqs/FAQs';
import Footer from '../../components/footer/Footer';
import Team from '../../components/meet-team/team';
import Speakers from "../../components/speakers/speakers";


// TITLES
import vh_title from 'assets/images/titles/vh-worded-logo.png';
import about_title from 'assets/images/titles/vh-about.png';
import faq_title from 'assets/images/titles/vh-faq.png';
// import sponsors_title from 'assets/images/titles/vh-sponsors.png';
import past_sponsors_title from 'assets/images/titles/vh-past-sponsors.png';
import partners_title from 'assets/images/titles/vh-partners.png';
import speakers_title from 'assets/images/titles/vh-speakers.png';
import meet_team_title from 'assets/images/titles/vh-meet-the-team.png';

// PARALLAX ASSETS
import stars_background from 'assets/images/stars-background.svg';
import periwinkle_planet from 'assets/images/vh-periwinkle-planet.png';
import pink_planet from 'assets/images/big-planet.png';
import constellation1 from 'assets/images/vh-big-dipper.png';
import constellation2 from 'assets/images/vh-cassiopeia.png';
import constellation3 from 'assets/images/vh-pegasus.png';
// import constellation4 from 'assets/images/constellation4.png';

// SPONSORS
import balsamiq from 'assets/images/sponsors/balsamiq.png';
import blackberry from 'assets/images/sponsors/blackberry.png';
import corelogic from 'assets/images/sponsors/corelogic.jpg';
import crowdstrike from 'assets/images/sponsors/crowdstrike.png';
import disney from 'assets/images/sponsors/disney.png';
import uciinformatics from 'assets/images/sponsors/uciinformatics.png';
import google_cloud from 'assets/images/sponsors/google_cloud.png';
import linode from 'assets/images/sponsors/linode.png';
import matlab from 'assets/images/sponsors/matlab.png';
import oai from 'assets/images/sponsors/oai.png';
import postman from 'assets/images/sponsors/postman.png';
import robinhood from 'assets/images/sponsors/robinhood.png';
import ucibren from 'assets/images/sponsors/ucibren.png';
import wayup from 'assets/images/sponsors/wayup.png';
import zybooks from 'assets/images/sponsors/zybooks.png';
import zillow from 'assets/images/sponsors/zillow.png';

// PARTNERS
import ai from 'assets/images/partners/ai.png';
import codepath from 'assets/images/partners/codepath.png';
import design from 'assets/images/partners/design.png';
import icssc from 'assets/images/partners/icssc.png';
import maiss from 'assets/images/partners/maiss.png';
import mlh from 'assets/images/partners/mlh.png';
import swe from 'assets/images/partners/swe.jpg';
import vgdc from 'assets/images/partners/vgdc.jpeg';
import { VenusButton } from "app/components";



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
                  <h4 id="date">May 20 - 22, 2022</h4>
                  <p id="tagline">UC Irvine's largest women-centric hackathon</p>
                </div>

            </section>
          </ParallaxLayer>

          {/* LEFT CONSTELLATION */}
          <ParallaxLayer className="parallax-asset" offset={1.3} speed={-0.1} style={{ pointerEvents: 'none' }}>
            <img src={constellation3} alt="constellation icon" style={{ width: '15%', height: 'auto', marginRight: '80%' }} />
          </ParallaxLayer>

          {/* UPPER-RIGHT CONSTELLATION */}
          <ParallaxLayer className="parallax-asset" offset={1.2} speed={-0.1} style={{ pointerEvents: 'none' }}>
            <img src={constellation1} alt="constellation icon" style={{ width: '15%', height: 'auto', marginLeft: '80%' }} />
          </ParallaxLayer>

          {/* LOWER-RIGHT CONSTELLATION */}
          <ParallaxLayer className="parallax-asset" offset={1.6} speed={-0.2} style={{ pointerEvents: 'none' }}>
            <img src={constellation2} alt="constellation icon" style={{ width: '15%', height: 'auto', marginLeft: '80%' }} />
          </ParallaxLayer>

          {/* UPPER-LEFT PLANET */}
          <ParallaxLayer className="parallax-asset" offset={2.02} speed={-0.1} style={{ pointerEvents: 'none' }}>
            <img src={pink_planet} alt="pink planet icon" style={{ width: '10%', height: 'auto', marginRight: '80%' }} />
          </ParallaxLayer>

          {/* LOWER-RIGHT PLANET */}
          <ParallaxLayer className="parallax-asset" offset={2.75} speed={-0.1} style={{ pointerEvents: 'none' }}>
            <img src={periwinkle_planet} alt="periwinkle planet icon" style={{ width: '12.5%', height: 'auto', marginLeft: '80%' }} />
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
                  VenusHacks is UCI’s largest
                  women-centric hackathon and will take place both in-person and online! 
                </p>
                <p>
                  Our mission is to empower underrepresented groups by providing an 
                  inclusive community to foster growth and creativity in computing. 
                  VenusHacks will be open to participants of all experience levels, as 
                  we aim to increase diversity in tech through support, exposure, and 
                  community. Join us as we welcome high school (18+), undergraduate, and 
                  graduate students to participate in our 36-hour event that includes networking, 
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
                  <a href="mailto:contact@venushacks.com" target="_top">
                    contact@venushacks.com
                  </a>.
                </p>
              </section>

              {/* SPONSORS **********************/}
              <section id="sponsors">
                  <img className="section-title" src={past_sponsors_title} alt="Sponsor" />
                  <div id="sponsors-container">
                    <div className="logo-wrapper largest">
                      {this.renderSponsorLink("blackberry", blackberry, "https://www.blackberry.com/us/en/company/careers/students")}
                    </div>
                    <div className="logo-wrapper large">
                      {this.renderSponsorLink("ucibren", ucibren, "https://www.ics.uci.edu/")}
                    </div>
                    <div className="logo-wrapper medium">
                      {this.renderSponsorLink("disney", disney, "https://jobs.disneycareers.com/technology")}
                      {this.renderSponsorLink("zillow", zillow, "https://www.zillow.com/careers/university/")}
                      {this.renderSponsorLink("oai", oai, "https://oai.tech.uci.edu/")}
                      {this.renderSponsorLink("uciinformatics", uciinformatics, "https://www.informatics.uci.edu/")}
                      {this.renderSponsorLink("google_cloud", google_cloud, "https://cloud.google.com/")}
                      {this.renderSponsorLink("crowdstrike", crowdstrike, "https://www.crowdstrike.com/careers/university-interns/")}
                      {this.renderSponsorLink("balsamiq", balsamiq, "https://balsamiq.com/company/jobs/")}
                      {this.renderSponsorLink("linode", linode, "https://www.linode.com/company/careers/")}
                      {this.renderSponsorLink("robinhood", robinhood, "https://robinhood.com/us/en/careers/")}
                      {this.renderSponsorLink("corelogic", corelogic, "https://www.corelogic.com/about-us/internships.aspx")}
                      {this.renderSponsorLink("wayup", wayup, "https://www.wayup.com/")}
                      {this.renderSponsorLink("matlab", matlab, "https://www.mathworks.com/company/jobs/students.html")}
                      {this.renderSponsorLink("zybooks", zybooks, "https://www.zybooks.com/careers/")}
                      {this.renderSponsorLink("postman", postman, "https://www.postman.com/company/careers/")}
                    </div>
                  </div>
                  <p className="sponsor-contact-us">
                    Join our movement, contact us&nbsp;
                    <a href="mailto:sponsorships@venushacks.com" target="_top">
                      sponsorships@venushacks.com
                    </a>.
                  </p>
              </section>

                {/* PARTNERS **********************/}
              <section id="partners">
                  <img className="section-title" src={partners_title} alt="Partners" />
                  <div id="partners-container">
                    <div className="logo-wrapper medium">
                      {this.renderSponsorLink("ai", ai, "https://aiclub.ics.uci.edu/")}
                      {this.renderSponsorLink("codepath", codepath, "https://codepath.org/")}
                      {this.renderSponsorLink("design", design, "https://designatuci.com/")}
                      {this.renderSponsorLink("icssc", icssc, "https://studentcouncil.ics.uci.edu/")}
                      {this.renderSponsorLink("maiss", maiss, "http://www.maissuci.com/")}
                      {this.renderSponsorLink("mlh", mlh, "https://mlh.io/")}
                      {this.renderSponsorLink("swe", swe, "https://sites.uci.edu/societywomenengineers/")}
                      {this.renderSponsorLink("vgdc", vgdc, "https://sites.google.com/uci.edu/vgdcuci/home")}
                    </div>
                  </div>
              </section>

              {/* SPEAKERS ******************/}
              <section id="speakers">
                <img className="section-title" src={speakers_title} alt="Speakers" />
                <Speakers/>
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
