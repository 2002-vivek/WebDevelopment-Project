import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type ServiceDocument = Service & Document;

@Schema()
export class Service{

    @Prop({required: true})
    service:string;

    @Prop({required: true})
    count_of_guards:number;

    @Prop({required: true})
    cost:number;

}

export const ServiceSchema = SchemaFactory.createForClass(Service);