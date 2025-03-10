let starterPackData = [
  {
    name: "User Interface",
    description: "Build a frontend you can interact with!",
    packs: [
      {
        name: "Frontend Starter Code",
        link: "https://github.com/HackAtUCI/zothacks-frontend-startercode",
        tooltip: "A basic webpage built using HTML, CSS, and JavaScript.",
        image: "/assets/images/telescope-image.png",
      },
      {
        name: "React Workshop",
        link: "https://github.com/nmpham2/hack-at-uci-react-intro",
        tooltip:
          "Learn how to use React, a JavaScript library for building user interfaces.",
        image: "/assets/images/ufo-1.png",
      },
      {
        name: "React Native",
        link: "https://reactnative.dev/",
        tooltip: "React, but for mobile!",
        image: "/assets/images/rocketship.png",
      },
      {
        name: "Android Studio",
        link: "https://developer.android.com/studio",
        tooltip:
          "Need a mobile emulator? Then Android Studio is the tool for you!",
        image: "/assets/images/laptop.png",
      },
      {
        name: "Flutter SDK",
        link: "https://docs.flutter.dev/",
        tooltip: "Tackle mobile development with this modern mobile SDK!",
        image: "/assets/images/planet-3.png",
      },
    ],
  },
  {
    name: "Backend",
    description: "Build an API for data management and processing!",
    packs: [
      {
        name: "Simple Flask Example",
        link: "https://github.com/HackAtUCI/zothacks-backend-startercode",
        tooltip: "A basic backend example using Flask.",
        image: "/assets/images/telescope-image.png",
      },
      {
        name: "Webscraping Workshop",
        link: "https://github.com/will-hou/hackatuci-learn-webscraping-2023",
        tooltip: "Learn how to extract data from websites!",
        image: "/assets/images/ufo-1.png",
      },
      {
        name: "Free Public APIs",
        link: "https://github.com/public-apis/public-apis",
        tooltip: "A collective list of free APIs to use.",
        image: "/assets/images/rocketship.png",
      },
      {
        name: "FastAPI",
        link: "https://fastapi.tiangolo.com/",
        tooltip: "A popular API Framework for Python.",
        image: "/assets/images/laptop.png",
      },
      {
        name: "PeterPortal Public API",
        link: "https://api.peterportal.org/",
        tooltip:
          "PeterPortal API provides data about UCI professors, courses, and grades.",
        image: "/assets/images/planet-3.png",
      },
    ],
  },
  {
    name: "Databases",
    description: "Store data in your own database!",
    packs: [
      {
        name: "CockroachDB",
        link: "https://www.cockroachlabs.com/docs/",
        tooltip: "A distributed SQL database from our sponsor Cockroach Labs!",
        image: "/assets/images/telescope-image.png",
      },
      {
        name: "MongoDB",
        link: "https://www.mongodb.com/",
        tooltip: "A popular NoSQL database.",
        image: "/assets/images/ufo-1.png",
      },
      {
        name: "PostgreSQL",
        link: "https://www.postgresql.org/",
        tooltip: "A popular object-relational database.",
        image: "/assets/images/rocketship.png",
      },
      {
        name: "MySQL",
        link: "https://www.mysql.com/",
        tooltip: "A popular relational database.",
        image: "/assets/images/laptop.png",
      },
    ],
  },
  {
    name: "Deployment",
    description:
      "Ready to deploy? Here are some tools to help you get started.",
    packs: [
      {
        name: "GitHub Pages",
        link: "https://pages.github.com/",
        tooltip: "Deploy your static site on GitHub Pages!",
        image: "/assets/images/telescope-image.png",
      },
      {
        name: "Vercel",
        link: "https://vercel.com/",
        tooltip: "Deploy your frontend app easily!",
        image: "/assets/images/ufo-1.png",
      },
      {
        name: "Google Cloud Platform",
        link: "https://cloud.google.com/docs",
        tooltip: "Scale your project with Google Cloud!",
        image: "/assets/images/rocketship.png",
      },
      {
        name: "Amazon Web Services",
        link: "https://docs.aws.amazon.com",
        tooltip: "Deploy your app to this large cloud computing platform!",
        image: "/assets/images/laptop.png",
      },
    ],
  },
  {
    name: "Gaming",
    description: "Build the next chart topping indie game!",
    packs: [
      {
        name: "Unity",
        link: "https://docs.unity3d.com/Manual/index.html",
        tooltip:
          "Official documentation for Unity, a cross-platform game engine",
        image: "/assets/images/telescope-image.png",
      },
      {
        name: "Godot",
        link: "https://godotengine.org/",
        tooltip:
          "Godot provides a huge set of common tools for game development",
        image: "/assets/images/ufo-1.png",
      },
      {
        name: "PyGame",
        link: "https://www.pygame.org/wiki/GettingStarted",
        tooltip:
          "Official documentation for PyGame, a cross-platform set of Python modules designed for writing video games",
        image: "/assets/images/rocketship.png",
      },
    ],
  },
  {
    name: "AI / Machine Learning",
    description:
      "Spice up your hackathon project with machine learning and AI!",
    packs: [
      {
        name: "Tensorflow",
        link: "https://www.tensorflow.org/",
        tooltip:
          "A comprehensive library for machine learning and artificial intelligence.",
        image: "/assets/images/telescope-image.png",
      },
      {
        name: "Pytorch",
        link: "https://pytorch.org/",
        tooltip: "A machine learning framework.",
        image: "/assets/images/ufo-1.png",
      },
      {
        name: "Scikit-learn",
        link: "https://scikit-learn.org/stable/",
        tooltip: "A data analysis and machine learning library.",
        image: "/assets/images/rocketship.png",
      },
    ],
  },
  {
    name: "General Resources",
    description: "Gotta build your projects with something!",
    packs: [
      {
        name: "Git",
        link: "https://docs.google.com/presentation/d/1Omd_azmTLQqrIjc6Bkva7PetFeQosLpfyLox8xDA5Mg/edit",
        tooltip: "A popular version control tool!",
        image: "/assets/images/telescope-image.png",
      },
      {
        name: "VS Code",
        link: "https://code.visualstudio.com/",
        tooltip:
          "A streamlined code editor with support for debugging, task running, and version control.",
        image: "/assets/images/ufo-1.png",
      },
      {
        name: "Postman",
        link: "https://www.getpostman.com/",
        tooltip: "Use Postman to test APIs!",
        image: "/assets/images/rocketship.png",
      },
      {
        name: "Ngrok",
        link: "https://ngrok.io",
        tooltip:
          "Instantly create a public URL for a website running locally on your development machine.",
        image: "/assets/images/laptop.png",
      },
    ],
  },
];

export { starterPackData };
