import {NestFactory} from "@nestjs/core";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {SubscriptionModule} from "../modules/subscription.module";

type ISubscriptionBootstrapOptions = {
    port: number,
    host: string
}

export const bootstrap = async ({port, host}: ISubscriptionBootstrapOptions) => {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(SubscriptionModule, {
        transport: Transport.TCP,
        options: {
            port,
            host
        }
    });
    await app.listen()
}
