import { Body, Controller, Post } from "@nestjs/common";
import { SubscribeService } from "./subscribe.service";
import { SubscribeDto } from "./subscribe.Dto";

@Controller('subscribe')
export class SubscribeController{
    constructor(private readonly subscribeService: SubscribeService){}

    @Post()
    async subscribe(@Body() subscriptionDto: SubscribeDto){

        const savedSubscription = this.subscribeService.subscribe(subscriptionDto);
        return {success: true, message:'Subscription saved Successfully', data: savedSubscription};
    }
    
}