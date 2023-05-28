import React from "react";
import './Home.scss';

import FAQs from '../../components/faqs/FAQs';
import Footer from '../../components/footer/Footer';
import Team from '../../components/meet-team/team';
import Speakers from "../../components/speakers/speakers";


// TITLES
import vh_title from 'assets/images/titles/vh-worded-logo.png';
import about_title from 'assets/images/titles/vh-about.png';
import faq_title from 'assets/images/titles/vh-faq.png';
import sponsors_title from 'assets/images/titles/vh-sponsors.png';
import partners_title from 'assets/images/titles/vh-partners.png';
import speakers_title from 'assets/images/titles/vh-speakers.png';
import meet_team_title from 'assets/images/titles/vh-meet-the-team.png';


// SPONSORS
import coxenterprises from 'assets/images/sponsors/coxenterprises.png';
import odit from 'assets/images/sponsors/odit.png';
import costar from 'assets/images/sponsors/costar.png';
import corelogic from 'assets/images/sponsors/corelogic.png';
import antrepreneurcenter from 'assets/images/sponsors/antrepreneurcenter.png';

// PARTNERS
import acm from 'assets/images/partners/acm.png';
import ai from 'assets/images/partners/ai.png';
import ctc from 'assets/images/partners/ctc.png';
import design from 'assets/images/partners/design.png';
import googlecloud from 'assets/images/partners/googlecloud.png';
import hack from 'assets/images/partners/hack.png';
import icssc from 'assets/images/partners/icssc.png';
import vgdc from 'assets/images/partners/vgdc.jpeg';
import wics from 'assets/images/partners/wics.png';

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
                {/* <p id="tagline">Apps are now closed! If you applied, please check your email for your application status.</p> */}
                <VenusButton text="DEVPOST" url="/devpost"/>
                <VenusButton text="OPENING SLIDES" url="https://docs.google.com/presentation/d/1T5tyLHiz6wc2yIEScvUzOKGqBmmSwFMk8ldt_koBGPs"/>
                <VenusButton text="FEEDBACK" url="/feedback"/>
                <VenusButton text="MIDWAY CHECK IN" url="/midway"/>
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
                    {this.renderSponsorLink("coxenterprises", coxenterprises, "https://www.coxenterprises.com/")}
                    {this.renderSponsorLink("odit", odit, "https://odit.uci.edu/")}
                  </div>
                  <div className="logo-wrapper large">
                    {this.renderSponsorLink("costar", costar, "https://www.costar.com/")}
                  </div>
                  <div className="logo-wrapper medium">
                    {this.renderSponsorLink("corelogic", corelogic, "https://www.corelogic.com/")} 
                    {this.renderSponsorLink("antrepreneurcenter", antrepreneurcenter, "https://antrepreneur.uci.edu/")}
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
                    {this.renderSponsorLink("acm", acm, "https://acm-uci.org/")}
                    {this.renderSponsorLink("ai", ai, "https://aiclub.ics.uci.edu/")}
                    {this.renderSponsorLink("ctc", ctc, "https://ctc-uci.com/")}
                    {this.renderSponsorLink("design", design, "https://designatuci.com/")}
                    {this.renderSponsorLink("google cloud", googlecloud, "https://cloud.google.com/")}
                    {this.renderSponsorLink("hack", hack, "https://hack.ics.uci.edu/")}
                    {this.renderSponsorLink("icssc", icssc, "https://studentcouncil.ics.uci.edu/")}
                    {this.renderSponsorLink("vgdc", vgdc, "https://sites.google.com/uci.edu/vgdcuci/home")}
                    {this.renderSponsorLink("wics", wics, "https://wics.ics.uci.edu/")}
                  </div>
                </div>
            </section>

            {/* SPEAKERS ******************/}
            <section id="speakers">
              <img className="section-title" src={speakers_title} alt="Speakers" />
              <Speakers/>
            </section>

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
