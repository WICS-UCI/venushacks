let workshopsData = [
  {
    title: "Hackathon 101: How to Get Started",
    description:
      "This workshop is all about demystifying and guiding first-time hackers on good hacking practices and the general flow of a hackathon. We will start out with how to get started, team role division, how to brainstorm project ideas, user interviews, how to decide on what technology nodes to use. Then, we show the general milestone timeline of a project. Then, to finish off, we will go over how to show-off your projects on resume or verbally with a recruiter.",
    host: {
      name: "WICS (Women in Information and Computer Sciences)",
      link: "https://wics.ics.uci.edu/",
    },
  },
  {
    title: "Become a Git God",
    description:
      "Scared by merge conflicts? Losing your files in git hell? Come learn how to use git confidently using more advanced commands and best practices.",
    host: {
      name: "ACM",
      link: "https://acm-uci.org/",
    },
  },
  {
    title: "Intro to Brand Design",
    description:
      "Creating a new project from scratch and want to make it look cohesive? Join Design at UCI as we host a beginner-friendly workshop on the basics of brand design. Learn how to build a brand identity that fits your product's concept, how to simplify the process of prototyping and design through a style guide that ✨ just makes sense ✨, and how to use visual elements to make your project stand out against the competition!",
    host: {
      name: "Design at UCI",
      link: "https://designatuci.com/",
    },
  },
  {
    title: "Firebase: The Perfect All-in-One Toolchain",
    description:
      "Firebase is one of the best tools for hackers like you who want to integrate services into your application as quickly as possible! We'll be journeying through several of Firebase's features, including authentication, file storage, and databases, and tying them all together in one simple React web application.",
    host: {
      name: "Hack at UCI",
      link: "https://hack.ics.uci.edu/",
    },
    prereqs: [
      {
        description: "Download NodeJS",
        link: "https://nodejs.org/en/download/",
      },
    ],
  },
  {
    title: "Intro To Unity and Game Development",
    description:
      "An introduction to the Unity Engine (a game development software). The workshop will cover a quick overview of everything you need to know to make a game including setting up a git repository for unity, the basics of implementing stuff like movement, level design, input, audio, animations, menus, and more. The workshop will teach people everything they need to know to make a simple game.",
    host: {
      name: "Video Game Development Club",
      link: "https://sites.google.com/uci.edu/vgdcuci/home",
    },
    prereqs: [
      {
        description: "Download Unity",
        link: "https://unity.com/download",
      },
    ],
  },
  {
    title: "Scaling to Zero: Building Serverless Discord Bots",
    description:
      'Unleash the power of serverless during our "Scaling to Zero" workshop! Learn what serverless is, its pros and cons, and unleash your creativity during our hands-on demo. Don\'t forget to bring your laptop, GitHub account, and Discord account to create your own pham bot!',
    host: {
      name: "ICS Student Council",
      link: "https://studentcouncil.ics.uci.edu/",
    },
    prereqs: [
      {
        description: "Register for a GitHub Account",
        link: "https://github.com/",
      },
    ],
  },
  {
    title: "Pre-trained Models in your Project",
    description:
      "This workshop provides an introduction to pre-trained models and demonstrates their usage in projects through Flask. You will gain an understanding of pre-trained models’ benefits and learn how to load them into memory. The workshop focuses on using Flask, a lightweight web framework, and covers the setup of a Flask application for handling model inference requests. You will learn about handling input data, forwarding it to pre-trained models for inference, and obtaining predictions or outputs. By the end, you will have the knowledge to integrate pre-trained models effectively using Flask, empowering your projects with advanced AI capabilities.",
    host: {
      name: "Commit the Change",
      link: "https://ctc-uci.com/",
    },
    prereqs: [
      {
        description: "Download Flask",
        link: "https://pypi.org/project/Flask/",
      },
    ],
  },
];

export { workshopsData };
