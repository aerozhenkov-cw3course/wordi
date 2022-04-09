import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

const isProd = process.env.IS_PROD === 'true';
const isDev = !isProd;

interface IWebappBootstrapOptions {
    port: number
}

const optionsFromEnv = () : IWebappBootstrapOptions => {
    return {
        port: parseInt(process.env.PORT)
    }
};


export const bootstrap = async (options: IWebappBootstrapOptions): Promise<void> => {
    const app = await NestFactory.create(AppModule);
    await app.listen(options.port, () => {
        console.log(`Webapp listening on port ${options.port}`)
    });
}

//
// export const bootstrap = async (options: IWebappBootstrapOptions): Promise<void> => {
//     const app = await NestFactory.create(AppModule);
//     await app.listen(options.port);
// }
//
//
// async function sleep(ms: number) {
//     return new Promise(resolve =>
//         setTimeout(resolve, ms));
// }
//
// const main = async () => {
//     console.log('start');
//     await sleep(1500);
//     console.log('finish');
// }
//
// console.log('mount webapp')
// sleep(3000)
//     .then(() => console.log('slept 3 seconds'))
//     .then(() => sleep(3000))
//     .then( async () => {
//         const a = await axios.get('http://localhost:3001');
//         console.log(`response from translation service: ${a}`)
//     })
//     .then(() => console.log('finish'))

if (isProd) {
    bootstrap(optionsFromEnv())
}

// main()

