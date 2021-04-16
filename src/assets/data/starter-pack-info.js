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
  {
    name: "WICS Intro to Web Dev",
    description: "Pre-work",
    packs: [
      {
        name: "Clone the Github repository",
        link: "https://github.com/kaseychuang/venushacks-web-dev-workshop",
        tooltip:
          "Link to repository"
      },
      {
        name: "ReadMe",
        link: "https://github.com/kaseychuang/venushacks-web-dev-workshop/blob/main/README.md",
        tooltip:
          "Follow setup instructions on the ReadMe"
      }
    ]
  },
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
    description: "Starter kits from MLH!",
    packs: [
      {
        name: "Flask Python",
        link: "https://github.com/MLH/mlh-hackathon-flask-starter",
        tooltip:
          "Microframework for building web applications in Python. Great for hackers familiar with Python"
      },
      {
        name: "Node.js JavaScript",
        link: "https://github.com/MLH/mlh-hackathon-nodejs-starter",
        tooltip:
          "This is great for hackers familiar with JavaScript and want to dig into server code"
      },
      {
        name: "DataStax",
        link: "https://stories.mlh.io/getting-started-with-datastax-astra-9bc2ef9ccf04",
        tooltip:
          "Mastering Apache Cassandra, a widely used open-source database technology known for its expansive scalability"
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
          "Consistent and scalable SQL database. Integrate easily with Node.js, Python, and more"
      },
    ]
  },
  {
    name: "User Interface",
    description: "Build a frontend you can interact with!",
    packs: [
      {
        name: "ZotHacks React Frontend",
        link: "https://github.com/hackuci/zothacks-2020-frontend",
        tooltip:
          "Checkout the frontend project and video tutorial from ZotHacks 2020! A great first step to getting started with a React frontend."
      },
      {
        name: "iOS App Development Workshop",
        link: "https://www.youtube.com/watch?v=50Uxl6hz3Ug",
        tooltip:
          "CodePath at UCI walks you through the basics of Xcode and how to build a simple iOS app for displaying a list of items."
      },
      {
        name: "Android Zothacks Workshop",
        link: "https://www.youtube.com/watch?v=u0tNBjglS2M",
        tooltip:
          "CodePath at UCI teaches you how to build a simple To-Do app in Android Studio."
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
    name: "Backend",
    description: "Build an API for data management and processing!",
    packs: [
      {
        name: "ZotHacks Flask Backend",
        link: "https://github.com/hackuci/zothacks-2020-backend",
        tooltip:
          "Checkout the backend project and video tutorial from ZotHacks 2020! A great first step to getting started with a Flask backend."
      },
      {
        name: "Wolfram API",
        link: "/starter-packs/wolfram",
        tooltip:
          "Wolfram sponsored backend services. Requires a little bit of setup!",
        content: (
          <>
            <h2>Wolfram API</h2>
            <p>
              Wolfram Research is pleased to sponsor your event by providing
              access to our latest technology, Wolfram|One! For complimentary
              access to our development platform and the Wolfram API, just click
              here:{" "}
              <a href="https://account.wolfram.com/redeem/HackUCI121">
                https://account.wolfram.com/redeem/HackUCI121
              </a>
            </p>
            <p>
              This URL will take you to a sign-in page and prompt you to log in
              using your Wolfram ID. If you don't already have a Wolfram ID,
              you'll be prompted to create one using an active email address.
              Once logged in, you will see in the Downloads section which
              platforms of the software you have access to, with their
              accompanying activation keys. Please download the desktop version
              to your machine, boot up the application and use the associated
              activation key when prompted. This will grant you full access for
              30 days from your activation date.
            </p>
            <p>
              When you access Wolfram|One in the cloud for the first time, you
              can create a new notebook or load a pre-made Things to Try live
              notebook, which is designed to guide you through neat things you
              can immediately compute in the Wolfram Language.
            </p>
            <p>
              You can use Wolfram|One to create instant web apps and APIs, or to
              deploy to mobile. The Wolfram Language is also bundled on the
              Raspberry Pi, where you can connect directly to hardware,
              including Arduino etc.
            </p>
            <p>
              The fastest way to get an API up and running is detailed in the
              extensive Documentation Center available to you alongside your
              notebook: simply click the section in the documentation labeled
              Cloud and Deployment and select Instant APIs to access a handy
              how-to guide to help get you started.
            </p>
            <p>
              To view your account details-- including your available Cloud
              Credits and Cloud storage-- or re-download Wolfram|One, visit the
              following page:{" "}
              <a href="https://account.wolfram.com/products">
                https://account.wolfram.com/products
              </a>
            </p>
            <p>
              Wolfram|One is the world's first fully integrated cloud-desktop
              hybrid, integrated computation platform. The core of our
              technology stack is the Wolfram Language, which builds on three
              decades of development, and represents a new direction in
              programming-- that happens to be absolutely ideal for hackathons.
            </p>
            <p>
              Wolfram Summer Programs has offerings for exceptional teens in
              high school as well as undergrads through post-docs. These
              programs are for those interested in programming, computational
              thinking, machine learning, and innovative tech. Students create
              and complete a unique project to publish during the program. To
              sign up for 2021 registration announcements visit:{" "}
              <a href="http://education.wolfram.com/summer/">
                http://education.wolfram.com/summer/
              </a>
            </p>
            <p>
              Interested in Wolfram mentorships or internships? Check out our
              opportunities here:{" "}
              <a href="https://www.wolfram.com/company/careers">
                https://www.wolfram.com/company/careers
              </a>
            </p>
            <p>Good luck, and happy hacking!</p>
          </>
        )
      },
      {
        name: "Voiceflow",
        link: "/starter-packs/voiceflow",
        tooltip:
          "Utilize a no-code voice assistant platform for Amazon Alexa and Google Assistant!",
      },
      {
        name: "Free Public APIs",
        link: "https://github.com/public-apis/public-apis",
        tooltip:
          "A collective list of free APIs for use in software and web development."
      },
      {
        name: "FastAPI",
        link: "https://fastapi.tiangolo.com/",
        tooltip:
          "Official documentation for FastAPI, a modern, fast, web framework for building APIs with Python 3.6+"
      },
      {
        name: "PeterPortal - An Unofficial API for UCI",
        link: "https://api.peterportal.org/",
        tooltip:
          "PeterPortal API provides consolidated data about UCI professors, courses, and grades."
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
        name: "GCP Credits",
        link:
          "https://docs.google.com/forms/d/e/1FAIpQLScSPqesC4HwHu1HmWqgI3HD_-N0syDsJBqVM_El4S-fz7IRLw/viewform",
        tooltip: "Access to free credits for hosting your project on GCP!"
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
      {
        name: "Replit",
        link: "/starter-packs/replit",
        tooltip:
          "Collaborative in-browser IDE that makes it easy to get hacking!",
      }
    ]
  }
];

export { starterPackData };
