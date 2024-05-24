let workshopsData = [
	{
		title: "Product and UI/UX Design for Hackathons",
		description:
			'This workshop will offer an introduction to rapid product development and ideation including design thinking, ui/ux design, and product evaluation. These are design strategies that I\'ve learned from attending 15 hackathons and processes that will optimize your design process. Design is one of the most important elements of a hackathon that adds polish and the "wow factor" to your hackathon project, in conjunction with the overall idea and impact. This workshop will provide you with beginner and programmer-friendly guides to level up your design and overall project.',
		host: {
			name: "Design@UCI",
			link: "https://designatuci.com/",
		},
	},
	{
		title: "Intro to SQL",
		description:
			"We will provide an introduction to SQL that covers the most vital database operations through verbal and visual explanations and an accompanying live coding demo that attendees can follow along with.",
		host: {
			name: "Data@UCI",
			link: "https://www.dataatuci.com/",
		},
		prereqs: [
			{
				description: "Download MongoDB",
				link: "https://www.mongodb.com/docs/manual/installation/",
			},
		],
	},
	{
		title: "Solo to Social",
		description:
			"Do you have friends? Do you like multiplayer applications? Learn how to build realtime multiplayer experiences for the web!",
		host: {
			name: "ICSSC",
			link: "https://studentcouncil.ics.uci.edu/",
		},
	},
	{
		title: "Intro to Git Basics",
		description:
			"In this workshop we will introduce the basics of Git and version control.",
		host: {
			name: "WICS",
			link: "https://wics.ics.uci.edu/",
		},
	},
	{
		title: "Intro to Web Dev",
		description:
			"Learn how to create a web app by going through the frontend and backend fundamentals in a live coding demo.",
		host: {
			name: "Ryan Yang",
		},
	},
	{
		title: "Into to Sveltekit",
		description:
			"Looking for ways to go beyond React and supercharge your website? Take a dive into SvelteKit, a web development framework that provides many of the functionalities of other frameworks but in a simpler and more intuitive format!",
		host: {
			name: "ACM@UCI",
			link: "https://www.acm-uci.org/",
		},
	},
	{
		title: "Intro to FastAPI",
		description:
			"FastAPI is a powerful tool for building APIs with Python! Come learn how to integrate FastAPI into your Hackathon project and get a working backend implemented.",
		host: {
			name: "Hack@UCI",
			link: "https://hack.ics.uci.edu/",
		},
	},
	{
		title: "Intro to Application Security: Protecting Your Projects Workshop",
		description:
			"Cybersecurity is a complex issue that usually requires consulting with experts and is managed by dedicated teams, but software developers should still be equipped with the knowledge to at least make sure their code and configurations are secure against trivial attacks. In this workshop, members from Cyber@UCI will teach you the fundamentals of application security and contextualize it in common hackathon projects so that you can at least discuss the security and privacy implications in your projects with mentors and judges. We also showcase different tools you can use to scan for security vulnerabilities in your code.",
		host: {
			name: "Cyber@UCI",
			link: "https://cyberuci.com/",
		},
	},
	{
		title: "API 101",
		description:
			"Want to level up your program? Use postman! We‘ll teach you how to easily integrate APIs without the hassle of confusing code!",
		host: {
			name: "Postman",
			link: "https://www.postman.com/",
		},
	},
];

export { workshopsData };
