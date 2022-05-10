import {Body, Controller, Get, Inject, Res, HttpStatus} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import * as request from '../types/api/request';
import * as response from '../types/api/response';
import {timeout, firstValueFrom} from "rxjs";
import {Response} from "express";

@Controller()
export class SubscriptionClientController {
    constructor(
        @Inject('SUBSCRIPTION_SERVICE') private subscriptionService: ClientProxy,
    ) {}

    @Get('/subscribe')
    async subscribe(
        @Body() data: request.Subscribe,
        @Res() res: Response<response.Subscribe>
    ): Promise<any> {

        const {hui} = data;

        if(!hui) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            res.status(HttpStatus.BAD_REQUEST).send("no hui provided")
        }

        // proxy to microservice through tcp (not http! (read nestjs docs))
        // result – stream of answers, but you need only first. That's why below "firstValueFrom"
        const subscription$ = this.subscriptionService.send<response.Subscribe>('subscribe', data)
            .pipe(
                timeout(2000)
            )

        return firstValueFrom(subscription$)
            .then((value) =>
                // вернул, что-то. Обрабатываем
                res
                    .status(HttpStatus.OK)
                    .send(value)
            )
            .catch(() =>
                // for example, микросервис упал
                res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .send()
            )
    }
}

