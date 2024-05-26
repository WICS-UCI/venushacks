let scheduleData = {
	friSchedule: [
		{
			name: "Check In",
			description:
				"Check in for the hackathon! Let us know beforehand if you won't be able to make the below time!",
			tooltip:
				"Please bring a photo ID when you check in so we can give you your badge!",
			time: "5:00PM-7:00PM",
		},
		{
			name: "Dinner",
			description: "Grab dinner on us!",
			tooltip:
				"Take a break from hacking, grab a meal provided by us, and socialize with others!",
			time: "6:00PM-7:00PM",
		},
		{
			name: "Teammate Tinder: Team Formation",
			description: "Team up hackers!",
			tooltip:
				"Stressed about team formation? Speed friendliness is here for you! If you already have a team, you are welcome to join to network with other teams and organizers!",
			time: "7:00PM-8:00PM",
		},
		{
			name: "Waitlist Check In",
			description:
				"Currently on the waitlist? Come by the hackathon check in to see if spots are still open!",
			tooltip:
				"Please bring a photo ID when you check in so we can give you your badge!",
			time: "7:00PM-8:00PM",
		},
		{
			name: "Opening Ceremony",
			description: "Welcome to VenusHacks!",
			tooltip:
				"Hear about the clubs and sponsors behind VenusHacks, as well as important rules and resources for navigating the hackathon! Featuring speakers from our sponsors at Melissa and industry professionals.",
			time: "8:00PM-9:00PM",
		},
		{
			name: "Hacking Begins",
			description: "Blast off!",
			tooltip: "Hacking officially starts",
			time: "9:00PM",
		},
		{
			name: "Product and UI/UX Design for Hackathons (Hosted by Design@UCI)",
			description:
				"This workshop will provide you with beginner and programmer-friendly guides to level up your design and overall project!",
			time: "9:00PM-10:00PM",
		},
		{
			name: "Intro to SQL (Hosted by Data@UCI)",
			description:
				"Come by for an introduction to SQL that covers the most vital database operations and an accompanying live coding demo to follow along with.",
			time: "10:00PM-11:00PM",
		},
	],
	satSchedule: [
		{
			name: "Check In",
			description: "Check in for the hackathon!",
			tooltip:
				"Bring your badge to check in! Always keep the badge visible with you.",
			time: "8:00AM-9:00AM",
		},
		{
			name: "Breakfast",
			description: "Grab breakfast on us!",
			tooltip:
				"Take a break from hacking, grab a meal provided by us, and socialize with others!",
			time: "9:00AM-10:00AM",
		},
		{
			name: "Solo to Social (Hosted by ICSSC)",
			description:
				"Do you have friends? Do you like multiplayer applications? Learn how to build realtime multiplayer experiences for the web!",
			time: "10:00AM-11:00AM",
		},
		{
			name: "Intro to Git Basics (Hosted by WICS@UCI)",
			description:
				"Join WICS for a workshop that will introduce the basics of Git and version control!",
			time: "11:00AM-12:00PM",
		},
		{
			name: "Lunch",
			description: "Grab lunch on us!",
			tooltip:
				"Take a break from hacking, grab a meal provided by us, and socialize with others!",
			time: "12:00PM-1:00PM",
		},
		{
			name: "Swag Drop",
			description: "Free swag!",
			tooltip:
				"Get your free hackathon swag provided by VenusHacks and its sponsors!",
			time: "12:00PM",
		},
		{
			name: "Intro to Web Dev (Hosted by Ryan Yang)",
			description:
				"Learn how to create a web app by going through the frontend and backend fundamentals in a live coding demo!",
			time: "1:00PM-2:00PM",
		},
		{
			name: "Mindful Moments: Crafting and Meditation Social",
			description:
				"Escape the Matrix! Relax outside, meditate, make cards, and journal!",
			time: "2:00PM-3:00PM",
		},
		{
			name: "Intro to Sveltekit (Hosted by ACM@UCI)",
			description:
				"Looking for ways to go beyond React and supercharge your website? Take a dive into SvelteKit, a web development framework that provides many of the functionalities of other frameworks but in a simpler and more intuitive format!",
			time: "3:00PM-4:00PM",
		},
		{
			name: "Crafting the Cosmos: DIY Planet Paper Lanterns Social",
			description:
				"Craft your own celestial wonders. Join us creating beautiful paper lanterns resembling the solar system!",
			time: "4:00PM-5:00PM",
		},
		{
			name: "Intro to FastAPI (Hosted by Hack@UCI)",
			description:
				"FastAPI is a powerful tool for building APIs with Python! Come learn how to integrate FastAPI into your Hackathon project and get a working backend implemented.",
			time: "5:00PM-6:00PM",
		},
		{
			name: "Dinner",
			description: "Grab dinner on us!",
			tooltip:
				"Take a break from hacking, grab a meal provided by us, and socialize with others!",
			time: "6:00PM-7:00PM",
		},
		{
			name: "Intro to Application Security: Protecting Your Projects (Hosted by Cyber@UCI)",
			description:
				"Learn the fundamentals of application security which can be used to apply to your hackathon project!",
			time: "7:00PM-8:00PM",
		},
		{
			name: "Designing the Universe Social",
			description:
				"Explore, Build, and Defend the Universe! Explore the city in your DIY toilet paper/streamer spacesuits. Build the new city with LEGO. Defend the universe from invaders in cup pong.",
			time: "8:00PM-9:00PM",
		},
		{
			name: "API 101 (Hosted by Postman)",
			description:
				"Want to level up your program? Use postman! We‘ll teach you how to easily integrate APIs without the hassle of confusing code!",
			time: "9:00PM-10:00PM",
		},
	],
	sunSchedule: [
		{
			name: "Check In",
			description: "Check in for the hackathon!",
			tooltip: "Bring your badge!",
			time: "8:00AM-9:00AM",
		},
		{
			name: "Hacking Ends",
			description: "Landing!",
			tooltip: "Hacking officially ends, give yourself a pat on the back!",
			time: "9:00AM",
		},
		{
			name: "Breakfast",
			description: "Grab breakfast on us!",
			tooltip:
				"Take a break from hacking, grab a meal provided by us, and socialize with others!",
			time: "9:00AM-10:30AM",
		},
		{
			name: "Swag Drop",
			description: "Free swag!",
			tooltip:
				"Get your free hackathon swag provided by VenusHacks and its sponsors!",
			time: "9:00AM",
		},
		{
			name: "Project Expo",
			description: "Check out other hackers' projects!",
			tooltip:
				"Showcase your projects to other hackers and see the many projects made by other hackers!",
			time: "10:30AM-12:00PM",
		},
		{
			name: "Speakers' Panel",
			description:
				"Have fun and gain knowledge by talking to people in the industry and UCI professors!",
			time: "1:00PM-2:00PM",
		},
		{
			name: "Closing Ceremony",
			description: "See you next year!",
			tooltip:
				"Excited for prizes? Come out to the closing ceremony where we will announce all the winners for VenusHacks 2024 and hear some final remarks from industry professionals and professors!",
			time: "2:00PM-3:00PM",
		},
	],
};

export { scheduleData };
