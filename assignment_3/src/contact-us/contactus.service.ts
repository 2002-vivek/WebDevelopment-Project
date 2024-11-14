import { Injectable } from "@nestjs/common";
import {CreateContactUsDto} from './contactus.Dto';
import { InjectModel } from "@nestjs/mongoose";
import { Contact, ContactDocument } from "./schemas/contact.schema";
import { Model } from "mongoose";
@Injectable()
export class ContactUsService{

    constructor(@InjectModel(Contact.name) private contactModel: Model<ContactDocument>){}

    async saveContactForm(data : CreateContactUsDto): Promise<Contact>{
        const newContact = new this.contactModel(data);
        return newContact.save();
    }
}