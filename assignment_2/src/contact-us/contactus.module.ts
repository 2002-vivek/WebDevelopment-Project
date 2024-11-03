import { Module } from "@nestjs/common";
import { ContactUsController } from "./contactus.controller";
import { ContactUsService } from "./contactus.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Contact, ContactSchema } from "./schemas/contact.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Contact.name, schema: ContactSchema}]),
    ],
    controllers: [ContactUsController],
    providers: [ContactUsService],
})

export class ContactModule{}