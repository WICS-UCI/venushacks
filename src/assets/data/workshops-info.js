let workshopsData = [
    {
        title: "Tech for Good Panel", 
        description: "Come join us for our Tech for Good panel with inspiring women from Change.org, LaunchCode, and Cosmos Pics! We will be exploring the side of tech that brings good changes into our everyday lives.",
        host: {
            name: "VenusHacks",
            link: "https://www.venushacks.com/"
        },
        recap: {
            "Recording": "https://uci.zoom.us/rec/share/9fI6oxeRhelBpGKTQuDHsX3ySGaKrzlKvW36GkBFxshfGThIdZm5U7z5s8tEiNJm.DoDok5Wq-Q2MbLvk"
        }
    },
    {
        title: "Intro to Web Dev", 
        description: "Want to create your own full-stack web application but not sure where to start? Come by to learn the basics of HTML/CSS, JavaScript, Bootstrap, and Python Flask by building a simple Expense Tracker!",
        host: {
            name: "WICS",
            link: "https://wics.ics.uci.edu/"
        },
        prereqs: [
            {
                description: "Clone the Github Repo",
                link: "https://github.com/WICS-UCI/venushacks-web-dev-workshop",
            },
            {
                description: "Follow README steps",
                link: "https://github.com/WICS-UCI/venushacks-web-dev-workshop/blob/main/README.md",
            }
        ],
        recap: {
            Recording: "https://uci.zoom.us/rec/share/bQo7ZUWDIzb_qQAGX8o6Fm7Yl_jSZTF3hDlUsx1xYgHSuLMATlj7PIiFVVy-YR2e.zCinReZllyNQVZss",
            Slides: "https://docs.google.com/presentation/d/1DNlBSbckMJH5rK1svym7awNEdovsyK2ZqiSAnaZTi8E/edit"
        }
    },
    {
        title: "iOS Development", 
        description: "Learn the basics of Xcode and Swift by building a fully-functional restaurant app! This workshop will guide you through iOS development workflows, APIs, and storyboards — all you'll need to kickstart your iOS journey.",
        host: {
            name: "CodePath",
            link: "https://sites.uci.edu/codepath"
        },
        prereqs: [
            {
                description: "Mac Required",
            },
            {
                description: "Download XCode",
                link: "https://developer.apple.com/xcode/resources/"
            },
            {
                description: "Download Starter Code",
                link: "https://drive.google.com/file/d/1wBlmsckdAYnUNcKmrKmo38A9vWV7E5BR/view?usp=sharing"
            },
            {
                description: "Create a Yelp Developer Account",
                link: "https://www.yelp.com/login?return_url=%2Fdevelopers%2Fv3%2Fmanage_app"
            },
            {
                description: "Get a Yelp API Key",
                link: "https://www.youtube.com/watch?v=GFhGN36Wf7Q&ab_channel=WidgetPack"
            }
        ],
        recap: {
            Recording: "https://uci.zoom.us/rec/share/_2RZlDZHJMylLZUJS24PAaF327Pdv_gea3Mvtl7eN4FfsQ6VNbOdigQmDda6YYA.tniK1ECu_HqZMNfL",
            Slides: "https://docs.google.com/presentation/d/1cx0Ft2-nFVhLAUijrXI0U5v1IIy--9OdFaqjeiicuKU/edit#slide=id.p1"
        }
    },
    {
        title: "Intro to UI/UX Design", 
        description: "Learn why a good user interface is crucial in creating seamless communication with users and why UX thinking matters when developing products. In this workshop, you'll see UX/UI designs come to life in case studies and examples and be able to apply these concepts your own projects",
        host: {
            name: "Design at UCI",
            link: "https://designatuci.com/"
        },
        recap: {
            Recording: "https://uci.zoom.us/rec/share/VHRLa0y5anCMzvzNff8B6zGP-iCUp0NBJnMVqHzXY4n4Cq0Rv5Uix4DWLF6Y6Ysk.ih3r-pYWYnHxTBZo",
            Slides: "https://docs.google.com/presentation/d/1PUJYtPPjqeHHQuiqjk0jw7Xna-oG-XfidlwsTERzYYs/edit"
        }
    },
    {
        title: "Android Development", 
        description: "In this workshop you will learn about Android app architecture, data manipulation, and styling. By the end of the workshop you should have the knowledge to build a simple app which you can build upon for your hackathon project!",
        host: {
            name: "CodePath",
            link: "https://sites.uci.edu/codepath"
        },
        prereqs: [
            {
                description: "Download Android Studio",
                link: "https://developer.android.com/studio/"
            },
            {
                description: "Clone the GitHub Repo",
                link: "https://github.com/powerserg23/SimpleTodo/blob/master/README.md"
            }
        ],
        recap: {
            Recording: "https://uci.zoom.us/rec/share/mHDR0150k4QRnkZyunrfIt0M3yB733Qr-AG_CthBUZb0RT7JNrErDLZkfSxDM5cG.02woEYnfnBP3-lSZ",
            Slides: "https://docs.google.com/presentation/d/1E5hXyvfCZUICzse2Mm8k_w-tq-9Zz1dvkAb3pGwwbK0/edit?usp=sharing"
        }
    },
    {
        title: "Disney Tech Talk", 
        description: "Infrastructure and software engineers make it possible to stream your favorite movies on Disney+. The Content Delivery Network and Origin team at Disney must deliver the best video quality experience to subscribers in order to stream effectively. To meet this goal, Disney uses multiple content delivery networks (CDNs) as a way to distribute the Disney+ content globally. Join us while we discuss CDNS, midtiers, control planes, and content management and how these all come together to create the streaming experience the world has come to expect from Disney.",
        host: {
            name: "Disney",
            link: "https://jobs.disneycareers.com/technology"
        },
        recap: {
            Recording: "https://uci.zoom.us/rec/share/s4VaNsyLTdy2FIpETkfXhLzZXg6BnFQ2g5BZGAGGAgD85ZqBg3PTf6DQ-mVvd4fY.IonhOznwfVBjnMNg",
        }
    },
    {
        title: "APIs 101 Workshop", 
        description: "Learn the basics of APIs in this hands-on101 session with Postman. Get direct experience working with APIs and Postman,an industry-standard tool. This workshop includes introduction to what APIs are and how to use them, as well as a demo API made by the Postman team that everyone can end live data to.",
        host: {
            name: "Postman",
            link: "https://www.postman.com/"
        },
    },
    {
        title: "The Unity Game Engine", 
        description: "Curious about game development and wondering where to start? In this short workshop, we will get you familiar with the Unity game engine and prepare you for an exciting journey into the world of making games!",
        host: {
            name: "Video Game Development Club at UCI",
            link: "https://sites.google.com/uci.edu/vgdcuci"
        },
        prereqs: [
            {
                description: "Download Unity",
                link: "https://unity.com/products"
            }
        ]
    },
    {
        title: "GraphQL Workshop", 
        description: "GraphQL is a Web API query language that steps above REST. We’d like to show you why companies like Facebook and SpaceX use GraphQL and how you can incorporate this powerful tool in your project!",
        host: {
            name: "ICS Student Council",
            link: "http://studentcouncil.ics.uci.edu/"
        },
    },
    {
        title: "Supervised Learning with Online Datasets Workshop", 
        description: "The topic of this workshop is supervised learning with online datasets. We will first give a brief introduction of artificial intelligence and why it is useful. Then, we will talk about the importance of choosing a good dataset and a good model. We will finish off with a demo of how to create a simple AI program to do image vision task.",
        host: {
            name: "AI@UCI",
            link: "https://aiclub.ics.uci.edu/"
        },
    },
    {
        title: "Imposter Syndrome", 
        description: "The Society of Women Engineers will be talking about resources for imposter syndrome and empowerment for women in tech. Join us to learn about how to deal with these feelings on a daily basis and support others who may be feeling this way as well.",
        host: {
            name: "Society of Women Engineers at UCI",
            link: "https://sites.uci.edu/societywomenengineers/"
        },
    },
    {
        title: "How to Pitch Your Hackathon Project", 
        description: "While hackathons can develop your coding and team-building skills, pitching your final product to the judges can be intimidating. Come through If you're looking to enhance your public speaking skills and learn various strategies to employ during your pitch at a hackathon.",
        host: {
            name: "MAISS",
            link: "http://www.maissuci.com/"
        },
    },
    {
        title: "Diversity in Tech Panel", 
        description: "Come join us for our Diversity in Tech Panel with a diverse set of empowering women from Linode, Darktrace, and Procure Technologies. We will be listening to how their identity as women impacted their personal journeys, decisions, and who they are today.",
        host: {
            name: "VenusHacks",
            link: "https://www.venushacks.com/"
        },
    },
    {
        title: "Exploring Data-Driven Advocacy", 
        description: "Percentage Project is a nonprofit organization that promotes data-driven advocacy and conducts climate surveys in partnership with post-secondary institutions in the US. Check out their workshop on YouTube to learn how you can take action to create more inclusive CS communities!",
        host: {
            name: "Percentage Project",
            link: "https://www.percentageproject.org/"
        },
        recap: {
            "Recording": "https://youtu.be/0VZqR982nRU"
        }
    },
]

export { workshopsData }
