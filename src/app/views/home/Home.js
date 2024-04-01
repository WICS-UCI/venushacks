import React from "react";
import { VenusButton } from "app/components";
import "./Home.scss";

// TITLES
import vh_title from "assets/images/titles/vh-title-launch.svg";

const VH_DATE = "May 24-26, 2024";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* Number of "pages" needed to contain all content under 
         the about section (faqs, sponsors, meet team, etc).
         This number is calculated in updateParallaxLayerHeight().
      */
      contentHeight: 8,
    };
    this.updateParallaxLayerHeight = this.updateParallaxLayerHeight.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateParallaxLayerHeight);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateParallaxLayerHeight);
  }

  /**
   * Calculates number of pages that all content under
   * the about section (faqs, sponsors, meet team, etc)
   * needs and updates this parallax layer
   */
  updateParallaxLayerHeight() {
    if (this._element && this._element.clientHeight) {
      let contentHeight = this._element.clientHeight / window.innerHeight;
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
    );
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
            <div id="shiba-inu" />
          </div>

          <div id="hero-right">
            <img
              id="venushacks-title"
              src={vh_title}
              alt="VenusHacks Title Logo"
            />
            <h4 id="date">{VH_DATE}</h4>
            <p className="tagline">
              UC Irvine's largest women-centric hackathon
            </p>
            <p className="tagline">Apps are now open!</p>
            <VenusButton text="Hacker" url="/apply"></VenusButton>
          </div>
        </section>
      </div>
    );
  }
}
