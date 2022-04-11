import {ClientsModule, Transport} from "@nestjs/microservices";

export type ITranslationClientModuleOptions = {
    host: string,
    port: number
};

export default function({host, port}: ITranslationClientModuleOptions) {
    return ClientsModule.register([
        {
            name: 'TRANSLATION_SERVICE',
            transport: Transport.TCP,
            options: {
                host,
                port
            }
        }
    ])
}
