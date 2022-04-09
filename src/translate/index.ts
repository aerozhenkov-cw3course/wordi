import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

const isProd = process.env.IS_PROD?.toUpperCase() === 'TRUE';
const isDev = !isProd;

interface ITranslateBootstrapOptions {
    port: number
}

const optionsFromEnv = () : ITranslateBootstrapOptions => {
    return {
        port: parseInt(process.env.PORT)
    }
};

export const bootstrap = async (options: ITranslateBootstrapOptions): Promise<void> => {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.TCP,
        options: {
            port: options.port,
            host: '0.0.0.0'
        }
    });
    await app.listen()
}

if (isProd) {
    bootstrap(optionsFromEnv())
}

