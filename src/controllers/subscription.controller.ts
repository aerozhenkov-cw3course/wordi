import { Controller } from '@nestjs/common';
import {MessagePattern, Payload} from "@nestjs/microservices";
import * as request from '../types/api/request';
import * as response from '../types/api/response';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user";
import {Subscription} from "../entities/subscription";
import {Repository} from "typeorm";
import {HttpService} from "@nestjs/axios";
import {firstValueFrom, Observable} from "rxjs";
import {AxiosResponse} from "axios";
import Stripe from 'stripe';
import { ok } from 'assert';

@Controller()
export class SubscriptionController {
    constructor(
        @InjectRepository(Subscription) private readonly subscriptionRepo: Repository<Subscription>,
        private httpService: HttpService
    ) {}

    @MessagePattern('subscribe')
    async subscribe(@Payload() {userId}: request.Subscribe): Promise<response.Subscribe> {
        const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
            apiVersion: '2020-08-27',
          });;
        const storeItem = { priceInCents: 1000, name: "Basic plan" }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
                  price_data: {
                    currency: "usd",
                    product_data: {
                      name: storeItem.name,
                    },
                    unit_amount: storeItem.priceInCents,
                  },
                  quantity: 1,
                }
            ],
            success_url: `${process.env.CLIENT_URL}/success.html`,
            cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
        });
        // return to main service that will proxy it to client
        return new Promise<response.Subscribe>(resolve => setTimeout(() => {
            resolve({url: session.url})
        }, 1500));
    }

    @MessagePattern('/complete_payment')
    async complete_payment(@Payload() {userId}: request.CompletePayment){
        let endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1)
        this.subscriptionRepo.save({endDate, userId})
        console.log("Payment Completed successfully");

        return true;
    }
}
