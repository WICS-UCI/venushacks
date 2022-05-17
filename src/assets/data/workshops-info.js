let workshopsData = [
    {
        title: "Web Design Basics", 
        description: "Interested in creating a clean and user-friendly design for your project? Join us for a workshop that focuses on web design basics, including the application of visual design principles, colors, branding, and accessibility. Additionally, we'll be providing resources for you to jumpstart your web design process!",
        host: {
            name: "Design@UCI",
            link: "https://designatuci.com/"
        },
    },
    {
        title: "The Basics of Pose Estimation", 
        description: "Join AI@UCI as we look into how AI can add a little bit of spice to you hackathon projects! For this workshop, we'll cover the basics of integrating a deep learning model into your project. Then, we'll walk you through a hands-on example using a deep learning model for pose estimation—the computer vision task of identifying the poses of people in an image or video. ",
        host: {
            name: "Artificial Intelligence@UCI",
            link: "https://aiclub.ics.uci.edu/"
        },
        prereqs: [
            {
                description: "Follow instructions here",
                link: "https://github.com/aiatuci/Examples/blob/main/VenusHacks2022/",
            }
        ],
    },
    {
        title: "How to Pitch A Hackathon Project", 
        description: "Learn how to pitch your hackathon project in a way that will impress judges and potential investors! We’ll be going over tips and tricks to convey your product or service’s feature roadmap, path to commercialization, market fit, and related effective communication skills needed!",
        host: {
            name: "MAISS",
            link: "https://www.maissuci.com/"
        },
    },
    {
        title: "What They Don't Tell You About Tech Interviews", 
        description: "Are you terrified of the tech interview process? Do you wish someone could just give you an end-to-end overview of what the whole process is like? Or are you someone who’s very frustrated with how you just don’t seem to understand what the interviewer wants? You get interviews and you seem to do everything right on paper, but something’s still amiss? If you find yourself saying yes to any of these questions, then this workshop is for you. In this workshop, we’ll walkthrough the tech interview process, including the art of networking during COVID, the standard tech interview process, tips and tricks for behavioural and technical rounds which go beyond just getting the question right and that’ll really help you stand out as a candidate, post-interview etiquette, compensation packages and negotiation etc. The best part? I recently went through this process myself so you’ll also get to hear the silly mistakes that I made along the way and what I learnt as I went along!",
        host: {
            name: "Yelp",
            link: "https://www.yelp.careers/us/en"
        },
    },
    {
        title: "Working with APIs", 
        description: "Come learn about how to use an API in your React project! We’ll show you how to fetch data about UCI from the PeterPortal API and how to set up your own REST API.",
        host: {
            name: "ICSSC",
            link: "https://studentcouncil.ics.uci.edu/"
        },
        prereqs: [
            {
                description: "Download Node",
                link: "https://nodejs.org/en/download/",
            }
        ],
           
    },
    {
        title: "Landing Your First Dev Job", 
        description: "In the current job market, landing your first job might be one of the most challenging experiences you may encounter to date. In this session, gain tips and tricks to help you improve your chances. You'll learn how to search for the right company/manager, find the right role, prepare for the interview and more.",
        host: {
            name: "Cox",
            link: "https://jobs.coxenterprises.com/businesses/cox-communications/"
        },
    },

]

export { workshopsData }
