import {NestFactory} from "@nestjs/core";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import SubscriptionModule, {ISubscriptionModuleOptions} from "../modules/subscription.module";

type ISubscriptionBootstrapOptions = ISubscriptionModuleOptions & {
    port: number,
    host: string
}

export const bootstrap = async ({port, host, pgOrm}: ISubscriptionBootstrapOptions) => {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        SubscriptionModule.register({pgOrm}), {
        transport: Transport.TCP,
        options: {
            port,
            host
        }
    });
    await app.listen()
}
