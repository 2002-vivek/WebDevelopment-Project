import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



export type ContactDocument = Contact & Document;


@Schema({timestamps: true})
export class Contact{

    @Prop({required: true})
    name:String;

    @Prop({required: true})
    email:string;

    @Prop()
    company?: string;

    @Prop({required: true})
    phone: number;

    @Prop({required: true})
    message:string;




}

export const ContactSchema = SchemaFactory.createForClass(Contact);