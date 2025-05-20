import "./About.scss";

export default function About() {
	return (
		<div id="about-content">
			<h2 className="about-title">ABOUT</h2>
			<div className="about-row">
				<div className="about-text">
					<p>
						VenusHacks is UCI's largest women-centric hackathon, an annual event
						empowering women, gender minorities, and other underrepresented
						groups in tech. Hosted by&nbsp;
						<a
							href="https://wics.ics.uci.edu/"
							target="_blank"
							rel="noopener noreferrer"
							className="about-url"
						>
							WICS
						</a>{" "}
						and&nbsp;
						<a
							href="https://hack.ics.uci.edu/"
							target="_blank"
							rel="noopener noreferrer"
							className="about-url"
						>
							Hack at UCI
						</a>
						,&nbsp;the hackathon is open to participants of all experience
						levels with a mission to increase diversity in the tech industry by
						providing an inclusive community where students can receive the
						support to grow and express their creativity in computing.
					</p>
				</div>

				<div className="about-image-container">
					<div id="otter" />
					<a
						href="https://wics.ics.uci.edu/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div className="floating-logo wics" aria-label="WICS Logo"></div>
					</a>
					<a
						href="https://hack.ics.uci.edu/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div className="floating-logo hack" aria-label="Hack Logo"></div>
					</a>
				</div>
			</div>

			<div className="about-row">
				<div className="about-image-container">
					<div id="purple-scuba" />
				</div>

				<div className="about-text align-right">
					<p>
						This year, VenusHacks will take place fully in-person in Spring
						2025! Join us as we welcome high school (18+), undergraduate, and
						graduate students to participate in our 36-hour (non-overnight)
						event that includes workshops, networking, fun activities, free food
						and swag, and lots of coding! Happy hacking!
					</p>
				</div>
			</div>
		</div>
	);
}
