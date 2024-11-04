import { ConflictException, HttpException, Injectable } from "@nestjs/common";
import { SubscribeDto } from "./subscribe.Dto";
import { Subscribe, SubscribeDocument } from "./schemas/subscribe.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model} from "mongoose";
import { MongoServerError } from 'mongodb';



@Injectable()
export class SubscribeService{

    constructor(@InjectModel(Subscribe.name) private subscribeModel: Model<SubscribeDocument>){}

    async subscribe(subscribeDto: SubscribeDto): Promise<Subscribe | { error: string }>{

        try{
            const newSubscriber = new this.subscribeModel(subscribeDto);
            return await newSubscriber.save();
        }
        catch(error){
            if( error instanceof MongoServerError && error.code === 11000) {
                throw new ConflictException('Email already subscribed');
            }
            throw new HttpException('Database Error', 500);
        }
        
    }
}