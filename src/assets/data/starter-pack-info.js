import React from "react";

let starterPackData = [
  {
    name: "CodePath iOS",
    description: "Pre-work",
    packs: [
      {
        name: "Mac",
        link: "/",
        tooltip:
          "You will need a Mac for this workshop"
      },
      {
        name: "Download XCode",
        link: "https://developer.apple.com/xcode/resources/",
        tooltip:
          "Link to Download"
      },
      {
        name: "Yelp Developer Account",
        link: "https://www.yelp.com/login?return_url=%2Fdevelopers%2Fv3%2Fmanage_app",
        tooltip:
          "Create a Yelp Developer Account"
      },
      {
        name: "Get a Yelp API Key",
        link: "https://www.youtube.com/watch?v=GFhGN36Wf7Q&ab_channel=WidgetPack",
        tooltip:
          "Link to Youtube Tutorial"
      },
    ]
  },
  {
    name: "CodePath Android",
    description: "Pre-work",
    packs: [
      {
        name: "Android Studio",
        link: "https://developer.android.com/studio/?gclid=Cj0KCQjwyN-DBhCDARIsAFOELTk6p95lbnMqdTVzN9hIxb4Wom4JX-vPgO6wfQfUT2egFgDfhOF1Y-YaAhE_EALw_wcB&gclsrc=aw.ds",
        tooltip:
          "Download Android Studio on you computer"
      },
      {
        name: "Clone the Github repository",
        link: "https://github.com/powerserg23/SimpleTodo/blob/master/README.md",
        tooltip:
          "Steps for how to clone the Github repository"
      }
    ]
  },
  // {
  //   name: "WICS Intro to Web Dev",
  //   description: "Pre-work",
  //   packs: [
  //     {
  //       name: "Clone the Github repository",
  //       link: "https://github.com/kaseychuang/venushacks-web-dev-workshop",
  //       tooltip:
  //         "Link to repository"
  //     },
  //     {
  //       name: "ReadMe",
  //       link: "https://github.com/kaseychuang/venushacks-web-dev-workshop/blob/main/README.md",
  //       tooltip:
  //         "Follow setup instructions on the ReadMe"
  //     }
  //   ]
  // },
  {
    name: "VGDC Unity Game Engine",
    description: "Pre-work",
    packs: [
      {
        name: "Download Unity",
        link: "https://unity.com/products",
        tooltip:
          "Link to Unity"
      },
    ]
  },
  {
    name: "MLH",
    description: "Check out these other resources provided by MLH!",
    packs: [
      {
        name: "Linode",
        link: "https://www.linode.com/docs/products/",
        tooltip:
          "Create an account and receive a $100 credit!"
      },
      {
        name: "Node.js JavaScript",
        link: "https://github.com/MLH/mlh-hackathon-nodejs-starter",
        tooltip:
          "This is great for hackers familiar with JavaScript and want to dig into server code"
      },
      {
        name: "Git",
        link: "https://education.github.com/pack",
        tooltip:
          "The GitHub Student Developer Pack gives hackers free access to the best developer tools, all in one place!"
      },
      {
        name: "Domain.com",
        link: "https://stories.mlh.io/your-domain-com-amazon-web-services-powered-site-in-30-minutes-or-less-8828f524bb6a",
        tooltip:
          "Domain.com provides all the domain services you need from registration to hosting to SSL certificates & beyond!"
      },
      {
        name: "DataStax",
        link: "https://stories.mlh.io/getting-started-with-datastax-astra-9bc2ef9ccf04",
        tooltip:
          "Cassandra made easy in the cloud!"
      },
      {
        name: "Radar",
        link: "https://radar.io/blog/radar-student-hackathon-playbook",
        tooltip:
          "Developer-friendly, privacy-first SDKs and APIs for location-aware hacks"
      },
      {
        name: "CockroachDB",
        link: "https://stories.mlh.io/making-your-first-query-with-cockroachdb-7163ac607e7c",
        tooltip:
          "Build apps that can survive anything!"
      },
      {
        name: "Google Cloud",
        link: "https://cloud.google.com/products/",
        tooltip:
          "Up to $100 in Google Cloud credits per account!"
      },
      {
        name: "GoDaddyRegistry",
        link: "https://hackp.ac/GoDaddy-medium",
        tooltip:
          "Get a free domain of your choice for 1 year!"
      },
    ]
  },
  {
    name: "User Interface",
    description: "Build a frontend you can interact with!",
    packs: [
      {
        name: "ZotHacks 2020: Frontend Workshop",
        link: "https://github.com/hackuci/zothacks-2020-frontend",
        tooltip:
          "Learn about frontend from our ZotHacks 2020 workshop!"
      },
      {
        name: "ZotHacks 2020: Advanced Frontend Workshop by WICS",
        link: "https://youtu.be/MAPOgz8dd-o",
        tooltip:
          "Check out what else you can do with frontend!"
      },
      {
        name: "Figma",
        link: "https://www.figma.com/",
        tooltip:
          "This UI design tool is a great asset to prototyping!"
      }
    ]
  },
  {
    name: "Backend",
    description: "Build an API for data management and processing!",
    packs: [
      {
        name: "ZotHacks 2020: Backend Workshop",
        link: "https://github.com/hackuci/zothacks-2020-backend",
        tooltip:
          "Checkout the backend project and video tutorial from ZotHacks 2020! A great first step to getting started with a Flask backend."
      },
      {
        name: "APIs",
        link: "https://github.com/public-apis/public-apis",
        tooltip:
          "Get inspiration from this list of public APIs!"
      }
    ]
  },
  {
    name: "Mobile",
    description: "Make a mobile app for your iOS or Android!",
    packs: [
      {
        name: "ZotHacks 2020: Codepath iOS Workshop",
        link: "https://www.youtube.com/watch?v=50Uxl6hz3Ug",
        tooltip:
          "Check out this iOS App Development Workshop by Codepath at UCI!"
      },
      {
        name: "ZotHacks 2020: Codepath Android Workshop",
        link: "https://www.youtube.com/watch?v=u0tNBjglS2M",
        tooltip:
          "Check out this Android App Development Workshop by Codepath at UCI!"
      },
      {
        name: "ReactJS",
        link: "https://reactjs.org/",
        tooltip:
          "Official documentation for ReactJS, a JavaScript library for building user interfaces"
      }
    ]
  },
  {
    name: "Gaming",
    description: "Build the next chart topping indie game!",
    packs: [
      {
        name: "Unity",
        link: "https://docs.unity3d.com/Manual/index.html",
        tooltip:
          "Official documentation for Unity, a cross-platform game engine"
      },
      {
        name: "Godot",
        link: "https://godotengine.org/",
        tooltip:
          "Godot provides a huge set of common tools for game development"
      },
      {
        name: "PyGame",
        link: "https://www.pygame.org/wiki/GettingStarted",
        tooltip:
          "Official documentation for PyGame, a cross-platform set of Python modules designed for writing video games"
      }
    ]
  },
  {
    name: "Tools",
    description: "Gotta build your projects with something!",
    packs: [
      {
        name: "Git",
        link: "https://github.com/zpinto/learn-git-with-hack",
        tooltip:
          "A complete tutorial on how to get started with Git, a version-control system"
      },
      {
        name: "Ngrok",
        link: "https://ngrok.io",
        tooltip:
          "Instantly create a public HTTPS url for a website running locally on your development machine using Ngrok"
      },
      {
        name: "Postman",
        link: "https://www.getpostman.com/",
        tooltip:
          "A great tool for testing RESTful APIs made by others or yourself"
      },
    ]
  }
];

export { starterPackData };
