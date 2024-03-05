import "./Home.scss";

const VH_DATE = "Coming Soon!";

const Home = () => {
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
          {/* <img
            id="venushacks-title"
            src={vh_title}
            alt="VenusHacks Title Logo"
          /> */}
          <h4 id="date">{VH_DATE}</h4>
          <p id="tagline">UC Irvine&apos;s largest women-centric hackathon</p>
        </div>
      </section>
    </div>
  )
};

export default Home;
