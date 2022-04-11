import {NestFactory} from "@nestjs/core";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {TranslationModule} from "../modules/translation.module";

interface ITranslationBootstrapOptions {
    port: number,
    host: string
}

export const bootstrap = async ({port, host}: ITranslationBootstrapOptions) => {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(TranslationModule, {
        transport: Transport.TCP,
        options: {
            port,
            host
        }
    });
    await app.listen()
}
