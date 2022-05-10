import { Controller } from '@nestjs/common';
import {MessagePattern, Payload} from "@nestjs/microservices";
import * as request from '../types/api/request';
import * as response from '../types/api/response';

@Controller()
export class SubscriptionController {
    @MessagePattern('subscribe')
    subscribe(@Payload() {hui}: request.Subscribe): Promise<response.Subscribe> {
        // return to main service that will proxy it to client
        return new Promise<response.Subscribe>(resolve => setTimeout(() => {
            resolve({pidor: "success", hui_given: hui})
        }, 1500));
    }
}
