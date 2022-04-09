const { spawn } = require('child_process');
const bootstrapWebapp = require('../dist/src/webapp/index').bootstrap;
const bootstrapTranslate = require('../dist/src/translate/index').bootstrap;

bootstrapWebapp({port: 3000})
bootstrapTranslate({port: 2000})

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
//
// const startPostgresAndRedisInDocker = async () => {
//     spawn('docker-compose', [
//         '-f', 'config/docker/pg-and-redis.docker-copmose.yaml',
//         '--env-file', './config/dotenv/.dev.env',
//         'up']
//     )
//     await sleep(3000);
// }
//
// const startServices = () => {
//     spawn('node', ['-f', '', '--env-file', './dotenv/.env', 'up'])
//     spawn('docker-compose', ['-f', '', '--env-file', './dotenv/.env', 'up'])
//     spawn('docker-compose', ['-f', '', '--env-file', './dotenv/.env', 'up'])
// }
//
// // startPostgresAndRedisInDocker()
// //     .then()
//
// console.log('yeah')
//
