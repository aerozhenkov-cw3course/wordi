import {ClientsModule, Transport} from "@nestjs/microservices";

export type ISubscriptionClientModuleOptions = {
    host: string,
    port: number
};

export default function({host, port}: ISubscriptionClientModuleOptions) {
    return ClientsModule.register([
        {
            name: 'SUBSCRIPTION_SERVICE',
            transport: Transport.TCP,
            options: {
                host,
                port
            }
        }
    ])
}
