import {Module} from '@nestjs/common';
import {SubscriptionController} from "../controllers/subscription.controller";

@Module({
    imports: [],
    controllers: [SubscriptionController],
})
export class SubscriptionModule {}
