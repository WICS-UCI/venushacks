let workshopsData = [
    {
        title: "iOS Workshop", 
        description: "Learn the basics of Xcode and Swift by building a fully-functional restaurant app! This workshop will guide you through iOS development workflows, APIs, and storyboards — all you'll need to kickstart your iOS journey.",
        prereqs: [
            {
                description: "Mac Required",
            },
            {
                description: "Download XCode",
                link: "https://developer.apple.com/xcode/resources/"
            },
            {
                description: "Create a Yelp Developer Account",
                link: "https://www.yelp.com/login?return_url=%2Fdevelopers%2Fv3%2Fmanage_app"
            },
            {
                description: "Get a Yelp API Key",
                link: "https://www.youtube.com/watch?v=GFhGN36Wf7Q&ab_channel=WidgetPack"
            }
        ]
    },
    {
        title: "Android Workshop", 
        description: "In this workshop you will learn about Android app architecture, data manipulation, and styling. By the end of the workshop you should have the knowledge to build a simple app which you can build upon for your hackathon project!",
        prereqs: [
            {
                description: "Download Android Studio",
                link: "https://developer.android.com/studio/"
            },
            {
                description: "Clone the starter",
                link: "https://github.com/powerserg23/SimpleTodo/blob/master/README.md"
            }
        ]
    }
]

export { workshopsData }