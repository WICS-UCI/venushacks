import React from "react";
import './Home.scss';

import FAQs from '../../components/faqs/FAQs';
import Footer from '../../components/footer/Footer';
import Team from '../../components/meet-team/team';
// import Speakers from "../../components/speakers/speakers";


// TITLES
import vh_title from 'assets/images/titles/vh-worded-logo.png';
import about_title from 'assets/images/titles/vh-about.png';
import faq_title from 'assets/images/titles/vh-faq.png';
import sponsors_title from 'assets/images/titles/vh-past-sponsors.png';
import partners_title from 'assets/images/titles/vh-past-partners.png';
// import speakers_title from 'assets/images/titles/vh-speakers.png';
import meet_team_title from 'assets/images/titles/vh-meet-the-team.png';


// SPONSORS
import assemblyai from 'assets/images/sponsors/assemblyai.png';
import balsamiq from 'assets/images/sponsors/balsamiq.png';
import coxautomotive from 'assets/images/sponsors/coxautomotive.png';
import crowdstrike from 'assets/images/sponsors/crowdstrike.png';
import slalom from 'assets/images/sponsors/slalom.png';
import pimco from 'assets/images/sponsors/pimco.JPG';
import properdata from 'assets/images/sponsors/properdata.png';

// PARTNERS
import ai from 'assets/images/partners/ai.png';
import design from 'assets/images/partners/design.png';
import googlecloud from 'assets/images/partners/googlecloud.png';
import icssc from 'assets/images/partners/icssc.png';
import maiss from 'assets/images/partners/maiss.png';
import wicys from 'assets/images/partners/wicys.png';

import { VenusButton } from "app/components";

const VH_DATE = 'May 26-28, 2023';
const CONTACT_EMAIL = 'contact@venushacks.com';
const CORPORATE_EMAIL = 'sponsorships@venushacks.com';

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

          {/* HERO **********************/}
          <section id="hero">

              <div id="astronaut-animation">
                {/* These assets are a background of a div instead of imgs to prevent 
                    them from being able to be saved to camera roll on iOS */}
                <div id="boba" />
                <div id="astronaut" />
                <div id="laptop" />
                <div id="cat" />
              </div>

              <div id="hero-right">
                <img id="venushacks-title" src={vh_title} alt="VenusHacks Title Logo"/>
                <h4 id="date">{VH_DATE}</h4>
                <p id="tagline">UC Irvine's largest women-centric hackathon</p>
                <p id="tagline">Apply now as a</p>
                <VenusButton text="HACKER" url="/apply"/>
                <VenusButton text="MENTOR" url="/mentor"/>
                <VenusButton text="VOLUNTEER" url="/volunteer"/>
              </div>
              <div id="planet" />
          </section>

          {/* ABOUT **********************/}
          <section id="about">
            <img className="section-title" src={about_title} alt="About"/>
            <div id="about-text-container">
              <p>
                Planned in collaboration with&nbsp;
                <a href="https://wics.ics.uci.edu/" target="_blank" rel="noopener noreferrer">WICS</a> and&nbsp;
                <a href="https://hack.ics.uci.edu/" target="_blank" rel="noopener noreferrer">Hack at UCI</a>,&nbsp;
                VenusHacks is UCI’s largest women-centric hackathon and will take place fully in-person in Spring 2023!
              </p>
              <p>
                Our mission is to empower underrepresented groups by providing an 
                inclusive community to foster growth and creativity in computing. 
                VenusHacks will be open to participants of all experience levels, as 
                we aim to increase diversity in tech through support, exposure, and 
                community. Join us as we welcome high school (18+), undergraduate, and 
                graduate students to participate in our 36-hour (non-overnight) event that
                includes networking, fun activities, educational workshops, and lots of coding!
              </p>
            </div>
          </section>

          <div ref={ref => {this._element = ref}}>

            {/* FAQ ************************/}
            <section id="faq">
              <img className="section-title" src={faq_title} alt="FAQ" />
              <FAQs/>
              <p id="faq-contact-us">
                Additional logistic questions? Contact us at&nbsp;
                <a href={`mailto:${CONTACT_EMAIL}`} target="_top">
                  {CONTACT_EMAIL}
                </a>.
              </p>
            </section>

            {/* SPONSORS **********************/}
            <section id="sponsors">
                <img className="section-title" src={sponsors_title} alt="Sponsor" />
                <div id="sponsors-container">
                    <div className="logo-wrapper largest">
                    {this.renderSponsorLink("coxautomotive", coxautomotive, "https://www.coxautoinc.com/")}
                  </div>
                  <div className="logo-wrapper large">
                    {this.renderSponsorLink("pimco", pimco, "https://www.pimco.com/en-us/?showSplash=1")}
                    {this.renderSponsorLink("properdata", properdata, "https://properdata.eng.uci.edu/")}
                  </div>
                  <div className="logo-wrapper medium">
                    {this.renderSponsorLink("slalom", slalom, "https://www.slalom.com/")} 
                    {this.renderSponsorLink("crowdstrike", crowdstrike, "https://www.crowdstrike.com/careers/university-interns/")}
                    {this.renderSponsorLink("balsamiq", balsamiq, "https://balsamiq.com/company/jobs/")}  
                    {this.renderSponsorLink("assemblyai", assemblyai, "https://www.assemblyai.com/")}
                  </div>
                </div>
                <p className="sponsor-contact-us">
                  Join our movement, contact us at&nbsp;
                  <a href={`mailto:${CORPORATE_EMAIL}`} target="_top">
                  {CORPORATE_EMAIL}
                  </a>.
                </p>
            </section>

            {/* PARTNERS **********************/}
            <section id="partners">
                <img className="section-title" src={partners_title} alt="Partners" />
                <div id="partners-container">
                  <div className="logo-wrapper medium">
                    {this.renderSponsorLink("ai", ai, "https://aiclub.ics.uci.edu/")}
                    {this.renderSponsorLink("design", design, "https://designatuci.com/")}
                    {this.renderSponsorLink("google cloud", googlecloud, "https://cloud.google.com/")}
                    {this.renderSponsorLink("icssc", icssc, "https://studentcouncil.ics.uci.edu/")}
                    {this.renderSponsorLink("maiss", maiss, "http://www.maissuci.com/")}
                    {this.renderSponsorLink("wicys", wicys, "https://sites.uci.edu/wicys/")}
                  </div>
                </div>
            </section>

            {/* SPEAKERS ******************/}
            {/* <section id="speakers">
              <img className="section-title" src={speakers_title} alt="Speakers" />
              <Speakers/>
            </section> */}

            {/* MEET THE TEAM ******************/}
            {/* Use padding if there's no org photos */}
            {/* <section id="padding" /> */}
            <section id="meet-team">
              <img className="section-title" src={meet_team_title} alt="Meet the Team" />
              <Team/>
            </section>
          </div>
        
          {/* FOOTER ******************/}
          <Footer/>

      </div>
    )
  }
}
