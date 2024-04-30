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
      name: "Swag Drop",
      description: "Free swag!",
      tooltip:
        "Get your free hackathon swag provided by VenusHacks and its sponsors!",
      time: "6:00PM",
    },
    {
      name: "Team Formation",
      description: "Team up hackers!",
      tooltip: "Get to know your fellow hackers and find potential teammates!",
      time: "7:00PM-8:00PM",
    },
    {
      name: "Waitlist Check In",
      description:
        "Currently on the waitlist? Come by the hackathon check in to see if spots are still open!",
      tooltip:
        "Please bring a photo ID when you check in so we can give you your badge!",
      time: "7:00PM-9:00PM",
    },
    {
      name: "Opening Ceremony",
      description: "Welcome to VenusHacks!",
      tooltip:
        "Hear about the clubs and sponsors behind VenusHacks, as well as important rules and resources for navigating the hackathon! Featuring speakers from our sponsors at Cox and UCI ODIT!",
      time: "8:00PM-9:00PM",
    },
    {
      name: "Costar Group Sponsor Boothing",
      description: "Network with companies!",
      tooltip:
        "Connect with employees from Costar and hear more about their company!",
      time: "8:00PM-9:00PM",
    },
    {
      name: "Hacking Begins",
      description: "Blast off!",
      tooltip: "Hacking officially starts",
      time: "9:00PM",
    },
    {
      name: "Hackathon 101: How to Get Started (Hosted by WICS)",
      // description: "WICS",
      description:
        "A guide to good hacking practices and the general flow of a hackathon. Learn about team role division, how to brainstorm project ideas, user interviews, how to decide on what technology nodes to use, the general milestone timeline of a project, and how to show-off your projects on resume or verbally with a recruiter!",
      time: "9:00PM-10:00PM",
    },
    {
      name: "Become a Git God (Hosted by ACM)",
      // description: "ACM",
      description:
        "Scared by merge conflicts? Losing your files in git hell? Come learn how to use git confidently using more advanced commands and best practices.",
      time: "10:00PM-11:00PM",
    },
    {
      name: "Musical Chairs",
      description: "Move to the music!",
      tooltip:
        "Ready to get up and get moving to the music? Come join us for some rounds of the classic game musical chairs, and see who's the last one sitting!",
      time: "11:00PM-12:00AM",
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
      name: "Costar Group Sponsor Boothing",
      description: "Network with companies!",
      tooltip:
        "Connect with employees from Costar and hear more about their company!",
      time: "9:00AM-2:00PM",
    },
    {
      name: "Breakfast",
      description: "Grab breakfast on us!",
      tooltip:
        "Take a break from hacking, grab a meal provided by us, and socialize with others!",
      time: "9:00AM-10:00AM",
    },
    {
      name: "Intro to Unity and Game Development (Hosted by VGDC)",
      // description: "VGDC",
      description:
        "Learn everything you need to know to make a simple game using the Unity Engine (a game development software)! Be sure to download and install Unity (https://unity.com/download) beforehand.",
      time: "10:00AM-11:00AM",
    },
    {
      name: "Firebase: The Perfect All-in-One Toolchain (Hosted by Hack at UCI)",
      // description: "Hack@UCI",
      description:
        "Firebase is one of the best tools for hackers like you who want to integrate services into your application as quickly as possible! We'll be journeying through several of Firebase's features, including authentication, file storage, and databases, and tying them all together in one simple React web application. Prerequisites: Users should have a text editor or integrated development environment (IDE) and have NodeJS installed.",
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
      name: "Pre-Trained Models in Your Project (Hosted by CTC)",
      // description: "CTC",
      description:
        "Learn how to integrate pre-trained models effectively using Flask, a lightweight web framework, and empower your projects with advanced AI capabilities! Prerequisites: Have Flask installed.",
      time: "1:00PM-2:00PM",
    },
    {
      name: "Scaling to Zero: Building Serverless Discord Bots (Hosted by ICSSC)",
      // description: "ICSSC",
      description:
        'Unleash the power of serverless during our "Scaling to Zero" workshop! Learn what serverless is, its pros and cons, and unleash your creativity during our hands-on demo. Don\'t forget to bring your laptop, GitHub account, and Discord account to create your own pham bot!',
      time: "2:00PM-3:00PM",
    },
    {
      name: "Friendship Bracelets",
      description: "A fun and creative way to bond with your friends!",
      tooltip:
        "Join us for our Friendship Bracelets social and get ready to unleash your inner artist to make your own beautiful, personalized, one-of-a-kind friendship bracelet with a rainbow of colorful threads and a variety of fun patterns to choose from!",
      time: "3:00PM-4:00PM",
    },
    {
      name: "Dinner",
      description: "Grab dinner on us!",
      tooltip:
        "Take a break from hacking, grab a meal provided by us, and socialize with others!",
      time: "6:00PM-7:00PM",
    },
    {
      name: "Origami",
      description: "Fold paper with us!",
      tooltip:
        "Discover the magical world of origami and take a relaxing break of folding your very own works of paper art. We'll have a variety of colorful paper, so let your creative side run wild and fold your own unique creations!",
      time: "7:00PM-8:00PM",
    },
    {
      name: "Intro to Brand Design (Hosted by Design at UCI)",
      // description: "Design@UCI",
      description:
        "Creating a new project from scratch and want to make it look cohesive? Join Design at UCI as we host a beginner-friendly workshop on the basics of brand design. Learn how to build a brand identity that fits your product's concept, how to simplify the process of prototyping and design through a style guide that ✨ just makes sense ✨, and how to use visual elements to make your project stand out against the competition!",
      time: "8:00PM-9:00PM",
    },
    {
      name: "Just Dance",
      description: "Show off your best moves!",
      tooltip:
        "Join us to let loose and dance the night away during our Just Dance social, with a huge selection of hit songs and popular dance routines!",
      time: "11:00PM-12:00AM",
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
      tooltip: "Hacking officially ends",
      time: "9:00AM",
    },
    {
      name: "CoStar Group Sponsor Boothing",
      description: "Network with companies!",
      tooltip:
        "Connect with employees from CoStar and hear more about their company!",
      time: "9:00AM-2:00PM",
    },
    {
      name: "Breakfast",
      description: "Grab breakfast on us!",
      tooltip:
        "Take a break from hacking, grab a meal provided by us, and socialize with others!",
      time: "9:00AM-10:00AM",
    },
    {
      name: "Project Expo",
      description: "Check out other hackers' projects!",
      tooltip:
        "Showcase your projects to other hackers and see the many projects made by other hackers!",
      time: "10:00AM-12:00PM",
    },
    {
      name: "Accessibility in Tech 2023 Panel",
      description:
        "Learn about the intersection of tech and disability from our panelists!",
      tooltip:
        "Featuring employees from Spotify and Crowdstrike and UCI alumni!",
      time: "12:00PM-1:00PM",
    },
    {
      name: "Closing Ceremony",
      description: "See you next year!",
      tooltip:
        "Excited for prizes? Come out to the closing ceremony where we will announce all the winners for VenusHacks 2023 and hear some final remarks from representatives from Cox and Slalom!",
      time: "1:00PM-2:00PM",
    },
  ],
};

export { scheduleData };
