import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type SubscribeDocument = Subscribe & Document;

@Schema()
export class Subscribe{
    @Prop({required: true, unique: true})
    email: string;
}

export const SubscribeSchema = SchemaFactory.createForClass(Subscribe);