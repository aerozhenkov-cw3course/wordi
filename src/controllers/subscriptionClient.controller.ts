import {Body, Controller, Get, Inject, Res, HttpStatus, Post, Req} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import * as request from '../types/api/request';
import * as response from '../types/api/response';
import {timeout, firstValueFrom} from "rxjs";
import {Response} from "express";
import { Request } from 'express';
import Stripe from 'stripe';

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

        // proxy to microservice through tcp (not http! (read nestjs docs))
        // result – stream of answers, but you need only first. That's why below "firstValueFrom"
        const subscription$ = this.subscriptionService.send<response.Subscribe>('subscribe', data)
            .pipe(
                timeout(5000)
            )
        return firstValueFrom(subscription$)
            .then((value) =>{
                // вернул, что-то. Обрабатываем
                res
                    .redirect(value.url)
            },
            )
            .catch((e) =>{
                console.log(e);
                // for example, микросервис упал
                res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .send()
            }
            )
    }

    @Post('/webhook')
    async webhook(
        @Req() req: Request<any>,
        @Res() res: Response<any>
    ): Promise<any> {
        const endpointSecret = process.env.WH_SECRET;
        const payload = req.body;
        const sig = req.headers['stripe-signature'];
        const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
            apiVersion: '2020-08-27',
          });;
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
          } catch (err) {
            // invalid signature
            res.status(400).end();
            return;
        }

        let intent = null;
        switch (event['type']) {
            case 'payment_intent.succeeded':
                intent = event.data.object;
                console.log("Succeeded:", intent.id);
                let r : request.CompletePayment = {
                    userId: intent.userId
                }
                this.subscriptionService.send('complete_payment', r)
                .pipe(
                    timeout(5000)
                )
                break;
            case 'payment_intent.payment_failed':
                intent = event.data.object;
                const message = intent.last_payment_error && intent.last_payment_error.message;
                console.log('Failed:', intent.id, message);
                break;
        }

        res.status(200);
    }
}

