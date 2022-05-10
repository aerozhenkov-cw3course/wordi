import {TypeOrmModule} from "@nestjs/typeorm";

export type IPgOrmModuleOptions = {
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
    entities: Array<any>
};

export default function(options: IPgOrmModuleOptions) {
    return TypeOrmModule.forRoot({
        type: 'postgres',
        ...options,
        // autoLoadEntities: true,
        synchronize: true,

    });
}
