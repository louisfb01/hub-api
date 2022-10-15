require('dotenv').config()
const execSync = require('child_process').execSync

// Archive git repository
execSync(`git archive HEAD > deploy.tar`)

// Add `.git` directory to `tar`
execSync(`tar -rf deploy.tar .git`)

execSync(
    `caprover deploy -u ${process.env.CAPROVER_URL} ` +
    `-a ${process.env.CAPROVER_APP} ` +
    `-p ${process.env.CAPROVER_PASSWORD} ` +
    `-n ${process.env.CAPROVER_NAME} ` +
    `-t ./deploy.tar`, { stdio: 'inherit' })

execSync(`rm ./deploy.tar`)