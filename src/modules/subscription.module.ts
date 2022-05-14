import {DynamicModule} from '@nestjs/common';
import {SubscriptionController} from "../controllers/subscription.controller";
import {User} from "../entities/user";
import {TypeOrmModule} from "@nestjs/typeorm";
import PgOrmModule, {IPgOrmModuleOptions} from "./pgOrm.module";
import {HttpModule} from "@nestjs/axios";

export type ISubscriptionModuleOptions = {
    pgOrm: Omit<IPgOrmModuleOptions, 'entities'>
}

export default class SubscriptionModule {
    static register(options: ISubscriptionModuleOptions): DynamicModule {
        return {
            module: SubscriptionModule,
            imports: [
                PgOrmModule({
                    ...options.pgOrm,
                    entities: [User]
                }),
                TypeOrmModule.forFeature([User]),
                HttpModule
            ],
            controllers: [SubscriptionController]
        }
    }
}
