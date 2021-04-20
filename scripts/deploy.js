const { ghpages } = require('gh-pages');
const { exit } = require('process')
const execSync = require('child_process').execSync;

// Intended Branch to deploy
const deployBranch = 'master'

// Style codes for formatting
const format = {
    bold: "\x1b[1m",
    red: "\x1b[31m",
    reset: "\x1b[0m"
}


// DEPLOY SCRIPT
// This functions deploys the current code to production
//  1. Checks that you are on the intended deploy branch
//  2. Creates a production build: `npm run build`
//  3. Deploys to production: `gh-pages -d build` 
const deploy = () => {
    console.log(`${format.bold}Beginning The Deploy Process!\n${format.reset}`);

    // Assert that the current branch is the deploy branch
    const currBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    if (currBranch != deployBranch) {
        // Abort with an error message
        console.log(
            `${format.bold+format.red}ERROR: ` +
            `${format.reset+format.bold}` +
            `You must be on the ${deployBranch} branch to deploy.\n${format.reset}` +
            `Please checkout and pull the latest version of ${deployBranch} before deploying.\n`
        );
        console.log(`${format.bold+format.red}Aborting Deploy`);
        exit(0)
    }
        
    // Create a build for production
    console.log("Creating a production build...")
    console.log("> npm run build")
    execSync('npm run build');
    console.log(`${format.bold}Build succeeded!\n${format.reset}`)

    // Deploy build to production
    console.log("Deploying to production...")
    console.log("> gh-pages -d build")
    execSync('gh-pages -d build')
    console.log(`\n${format.bold}🎉 Successfully deployed 🎉${format.reset}`)
}

deploy()