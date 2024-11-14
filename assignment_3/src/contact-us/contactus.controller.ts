import { Body, Controller, Post } from '@nestjs/common';
import { ContactUsService } from './contactus.service';
import {CreateContactUsDto} from './contactus.Dto';


@Controller('contact')
export class ContactUsController {
    constructor(private readonly contactUsService : ContactUsService){}

    @Post()
    async submitContactForm(@Body() requestData: CreateContactUsDto){
        const savedContact = await this.contactUsService.saveContactForm(requestData);

        return  ( {success: true, message: "Contact data saved successfully.", data:savedContact});
    }
}
