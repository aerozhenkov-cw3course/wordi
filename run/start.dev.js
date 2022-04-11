const dotenv = require('dotenv')
const main = require('../dist/apps/main');
const translation = require('../dist/apps/translation');

const envFilePath = process.env.ENV_FILE_PATH

if (!envFilePath) throw new Error("No .env file provided")

dotenv.config({
    path: envFilePath
})

const runMain = async () => {
    await main.bootstrap({
        port: parseInt(process.env.MAIN_PORT),
        translationClient: {
            port: parseInt(process.env.TRANSLATION_SERVICE_PORT),
            host: 'localhost'
        },
        pgOrm: {
            port: parseInt(process.env.PG_PORT),
            host: process.env.PG_HOST,
            username: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PD_DATABASE
        }
    })
}

const runTranslation = async () => {
    await translation.bootstrap({
        port: parseInt(process.env.TRANSLATION_SERVICE_PORT),
        host: 'localhost'
    })
}

Promise.all([
    runTranslation(),
    runMain()
]).then(() => {
    console.info(`App is now running in dev mode on port = ${process.env.MAIN_PORT}`)
})
