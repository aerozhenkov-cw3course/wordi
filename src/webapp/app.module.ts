import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { TranslateController } from "./controllers/translate.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./entities/user";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'TRANSLATION_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: '127.0.0.1',
                    port: 2000
                }
            }
        ]),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'user',
            password: 'admin',
            database: 'wordi',
            entities: [User],
            // autoLoadEntities: true,
            // synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [TranslateController, AuthController],
    providers: [],
})
export class AppModule {}

