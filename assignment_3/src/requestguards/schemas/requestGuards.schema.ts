import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Service, ServiceSchema } from "./service.schema";

export type requestingGuardsDocument = Document & requestingGuards;

@Schema()
export class requestingGuards{
    @Prop({type:[ServiceSchema], required: true})
    services: Service;
    
    @Prop({required:true})
    total_cost: number;

    @Prop({required: true})
    userId: string;
}

export const RequestGuardsSchema = SchemaFactory.createForClass(requestingGuards);
