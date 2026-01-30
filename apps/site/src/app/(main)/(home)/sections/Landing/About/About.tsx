const About = () => {
	return (
		<div className="w-full pb-40 flex flex-col justify-center items-center">
			<div className="flex flex-col justify-center items-center gap-14 text-center px-20 max-w-[1500px]">
				<h2 className="font-display text-pink text-4xl md:text-6xl lg:text-8xl">
					What is VenusHacks?
				</h2>
				<div>
					<p>
						VenusHacks is UCI&apos;s largest women-centric hackathon, an annual
						event empowering women, gender minorities, and other
						underrepresented groups in tech. Hosted by WICS and Hack at UCI, the
						hackathon is open to participants of all experience levels with a
						mission to increase diversity in the tech industry by providing an
						inclusive community where students can receive the support to grow
						and express their creativity in computing.
						<br /> <br />
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
};

export default About;
