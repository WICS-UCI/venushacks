let scheduleData = {
  satSchedule: [
    {
      name: 'Team Formation',
      link: 'https://uci.zoom.us/j/92221155593',
      description: 'Meet fellow hackers!',
      tooltip: "Didn't make it to yesterday's team formation event? No worries! We are hosting another team formation event right before hacking to help you find members for your ultimate dream team!",
      time: '9:00AM-10:00AM'
    },
    {
      name: 'Opening Ceremony',
      link: 'https://youtu.be/YOVul8y9tUw',
      description: 'Getting started',
      tooltip: "Welcome to VenusHacks 2021! Our opening ceremony will cover everything you need to know about this weekend, including all the fun workshops, socials, prizes, swag, and more! We will also hear from our opening keynote speaker, Lisa Conn, the Cofounder and Chief Operating Officer at Icebreaker so be sure to join in via YouTube livestream!",
      time: '10:00AM-11:00AM'
    },
    {
      name: 'Tech for Good Panel',
      link: 'https://uci.zoom.us/j/94535498642',
      description: 'Change.org, LaunchCode, Cosmos Pics',
      tooltip: "Come join us for our Tech for Good panel with inspiring women from Change.org, LaunchCode, and Cosmos Pics! We will be exploring the side of tech that brings good changes into our everyday lives.",
      time: '11:00AM-12:00PM'
    },
    {
      name: 'Hacking Begins',
      description: 'Blast-off!',
      tooltip: "Hacking officially begins",
      time: '12:00PM'
    },
    {
      name: 'Intro to Web Dev',
      link: 'https://uci.zoom.us/j/98907500070',
      description: 'WICS',
      tooltip: "Want to create your own full-stack web application but not sure where to start? Come by to learn the basics of HTML/CSS, JavaScript, Bootstrap, and Python Flask by building a simple Expense Tracker!",
      time: '12:00PM-1:00PM'
    },
    {
      name: 'iOS Development',
      link: 'https://uci.zoom.us/j/98043160884',
      description: 'CodePath',
      tooltip: "Learn the basics of Xcode and Swift by building a fully-functional restaurant app! This workshop will guide you through iOS development workflows, APIs, and storyboards — all you'll need to kickstart your iOS journey. Refer to the starter packs for the steps you need to take before attending.",
      time: '12:00PM-1:00PM'
    },
    {
      name: 'Intro to UI/UX Design',
      link: 'https://uci.zoom.us/j/96828624934',
      description: 'Design at UCI',
      tooltip: "Learn why a good user interface is crucial in creating seamless communication with users and why UX thinking matters when developing products. In this workshop, you'll see UX/UI designs come to life in case studies and examples and be able to apply these concepts your own projects! ",
      time: '1:00PM-2:00PM'
    },
    {
      name: 'Disney Tech Talk',
      link: 'https://uci.zoom.us/j/99473643316',
      description: 'Disney',
      tooltip: "Infrastructure and software engineers make it possible to stream your favorite movies on Disney+. The Content Delivery Network and Origin team at Disney must deliver the best video quality experience to subscribers in order to stream effectively. To meet this goal, Disney uses multiple content delivery networks (CDNs) as a way to distribute the Disney+ content globally. Join us while we discuss CDNS, midtiers, control planes, and content management and how these all come together to create the streaming experience the world has come to expect from Disney.",
      time: '2:00PM-3:00PM'
    },
    {
      name: 'Android Development',
      link: 'https://uci.zoom.us/j/92109394679',
      description: 'CodePath',
      tooltip: "In this workshop you will learn about Android app architecture, data manipulation, and styling. By the end of the workshop you should have the knowledge to build a simple app which you can build upon for your hackathon project! Refer to the starter packs for the steps you need to take before attending.",
      time: '3:00PM-4:00PM'
    },
    {
      name: 'APIs 101 Workshop',
      link: 'https://uci.zoom.us/j/92479898700',
      description: 'Postman',
      tooltip: "Learn the basics of APIs in this hands-on 101 session with Postman. Get direct experience working with APIs and Postman,an industry-standard tool. This workshop includes introduction to what APIs are and how to use them, as well as a demo API made by the Postman team that everyone can send live data to.",
      time: '4:00PM-5:00PM'
    },
    {
      name: 'The Unity Game Engine',
      link: 'https://uci.zoom.us/j/98094631168',
      description: 'VGDC',
      tooltip: "Curious about game development and wondering where to start? In this short workshop, we will get you familiar with the Unity game engine and prepare you for an exciting journey into the world of making games!",
      time: '5:00PM-6:00PM'
    },
    {
      name: 'Cyber Security Challenge',
      link: 'https://uci.zoom.us/j/99122491205',
      description: 'MLH',
      tooltip: "The USAF Cyber Security Challenge is a beginner-friendly capture the flag style event where you'll tackle a few security challenges in a fun environment. No experience necessary! ",
      time: '5:30PM-6:00PM'
    },
    {
      name: 'GraphQL Workshop',
      link: 'https://uci.zoom.us/j/96242131335',
      description: 'ICSSC',
      tooltip: "GraphQL is a Web API query language that steps above REST. We’d like to show you why companies like Facebook and SpaceX use GraphQL and how you can incorporate this powerful tool in your project!",
      time: '6:00PM-7:00PM'
    },
    {
      name: 'Supervised Learning with Online Datasets Workshop',
      link: 'https://uci.zoom.us/j/99364847238',
      description: 'AI@UCI',
      tooltip: "The topic of this workshop is supervised learning with online datasets. We will first give a brief introduction of artificial intelligence and why it is useful. Then, we will talk about the importance of choosing a good dataset and a good model. We will finish off with a demo of how to create a simple AI program to do image vision task.",
      time: '7:00PM-8:00PM'
    },
    {
      name: 'Imposter Syndrome',
      link: 'https://uci.zoom.us/j/95912998559',
      description: 'SWE',
      tooltip: "The Society of Women Engineers will be talking about resources for imposter syndrome and empowerment for women in tech. Join us to learn about how to deal with these feelings on a daily basis and support others who may be feeling this way as well.",
      time: '8:00PM-9:00PM'
    },
    {
      name: 'Drawphone',
      link: 'https://uci.zoom.us/j/98223072689',
      description: 'Let\'s have some fun!',
      tooltip: "Combine Drawing with the game Telephone to get Drawphone ! Come play Drawphone to misinterpret some art and have a good laugh >:^). ",
      time: '9:00PM-10:00PM'
    },
    {
      name: 'How to Pitch Your Hackathon Project',
      link: 'https://uci.zoom.us/j/94401407167',
      description: 'MAISS',
      tooltip: "While hackathons can develop your coding and team-building skills, pitching your final product to the judges can be intimidating. Come through If you're looking to enhance your public speaking skills and learn various strategies to employ during your pitch at a hackathon.",
      time: '10:00PM-11:00PM'
    },
    {
      name: 'binarysearch',
      link: 'https://uci.zoom.us/j/95759746304',
      description: 'Let\'s do some coding!',
      tooltip: "Have you ever wanted to Leetcode and Chill with your homies? Come out for a round of binarysearch to solve a few problems! Make an account beforehand at https://binarysearch.com.",
      time: '11:00PM-12:00AM'
    },
  ],
  sunSchedule: [
    {
      name: 'Hacking Ends',
      description: 'Landing!',
      tooltip: "Hacking officially ends",
      time: '12:00PM'
    },
    {
      name: 'Diversity in Tech Panel',
      link: 'https://uci.zoom.us/j/91396656865',
      description: 'Linode, Darktrace, Procore Technologies',
      tooltip: "Come join us for our Diversity in Tech Panel with a diverse set of empowering women from Linode, Darktrace, and Procore Technologies. We will be listening to how their identity as women impacted their personal journeys, decisions, and who they are today.",
      time: '2:00PM-3:00PM'
    },
    {
      name: 'Bob Ross Painting Along',
      link: 'https://uci.zoom.us/j/94228741813',
      description: 'Let\'s get creative!',
      tooltip: "At Bob Ross MS Paint, you'll relax as you recreate your own Bob Ross painting in MS Paint.",
      time: '5:30PM-6:00PM'
    },
    {
      name: 'Closing Ceremony',
      link: 'https://youtu.be/koFpykh3hrA',
      description: 'See you next year!',
      tooltip: "Ready to find out if you won a prize? Then come out to our closing ceremony where we will announce all the winners for VenusHacks 2021! We will also hear from our closing keynote speaker, Emily Van Norden, the Senior Director of DE&I and Corporate Communications at Crowdstrike!",
      time: '6:00PM-7:00PM'
    },
    
  ]
}

export { scheduleData };