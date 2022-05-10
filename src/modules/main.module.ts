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

/*
export default function(options: IMainModuleOptions): DynamicModule {
    return {
        module:
        imports: [
            TranslationClientModule(options.translationClient),
            PgOrmModule({
                ...options.pgOrm,
                entities: [User]
            }),
            TypeOrmModule.forFeature([User]),
            ServeStaticModule.forRoot({
                rootPath: path.join(__dirname, '..', 'static')
            })
        ]
    };
    // return @Module({
    //     imports: [
    //         TranslationClientModule(options.translationClient),
    //         PgOrmModule({
    //             ...options.pgOrm,
    //             entities: [User]
    //         }),
    //         TypeOrmModule.forFeature([User]),
    //         ServeStaticModule.forRoot({
    //             rootPath: path.join(__dirname, '..', 'static')
    //         })
    //     ]
    // }) class MyCl {}

    // const a = @Module({}) class {}
    //
    // @Module({})
    // return class Apppp {
    //
    // }
}

@Module({
    imports: [

        // ClientsModule.register([
        //     {
        //         name: 'TRANSLATION_SERVICE',
        //         transport: Transport.TCP,
        //         options: {
        //             host: '127.0.0.1',
        //             port: 2000
        //         }
        //     }
        // ]),
        // TypeOrmModule.forRoot({
        //     type: 'postgres',
        //     host: 'localhost',
        //     port: 5432,
        //     username: 'user',
        //     password: 'admin',
        //     database: 'wordi',
        //     entities: [User],
        //     // autoLoadEntities: true,
        //     // synchronize: true,
        // }),
        TypeOrmModule.forFeature([User]),
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, '..', 'static')
        })
    ],
    controllers: [TranslateController, AuthController],
    providers: [],
})

export class MainModule {}
*/
