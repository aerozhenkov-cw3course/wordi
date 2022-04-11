import MainModule, {IMainModuleOptions} from "../modules/main.module";
import {NestFactory} from "@nestjs/core";
import {DynamicModule} from "@nestjs/common";

type IMainBootstrapOptions = IMainModuleOptions & {
    port: number
}

export const bootstrap = async (options: IMainBootstrapOptions) => {
    const app = await NestFactory.create(
        MainModule.register(options)
    );

    await app.listen(options.port, () => {
        console.log(`Main listening on port ${options.port}`)
    });
}
