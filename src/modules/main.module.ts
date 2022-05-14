import {DynamicModule, Module} from "@nestjs/common";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entities/user";
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";
import {
    default as TranslationClientModule,
    ITranslationClientModuleOptions
} from "./translationClient.module";
import {
    default as SubscriptionClientModule,
    ISubscriptionClientModuleOptions
} from "./subscriptionClient.module";
import {
    default as PgOrmModule,
    IPgOrmModuleOptions
} from "./pgOrm.module";
import {TranslationClientController} from "../controllers/translationClient.controller";
import {AuthController} from "../controllers/auth.controller";
import {SubscriptionClientController} from "../controllers/subscriptionClient.controller";

export type IMainModuleOptions = {
    translationClient: ITranslationClientModuleOptions,
    subscriptionClient: ISubscriptionClientModuleOptions,
    pgOrm: Omit<IPgOrmModuleOptions, 'entities'>
}

export default class MainModule {
    static register(options: IMainModuleOptions): DynamicModule {
        return {
            module: MainModule,
            imports: [
                TranslationClientModule(options.translationClient),
                SubscriptionClientModule(options.subscriptionClient),
                PgOrmModule({
                    ...options.pgOrm,
                    entities: [User]
                }),
                TypeOrmModule.forFeature([User]),
                // ServeStaticModule.forRoot({
                //     rootPath: join(__dirname, '..', 'static')
                // })
            ],
            controllers: [AuthController, TranslationClientController, SubscriptionClientController]
        }
    }
}
