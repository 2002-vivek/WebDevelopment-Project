import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { requestingGuards, requestingGuardsDocument } from './schemas/requestGuards.schema';
import { Model } from 'mongoose';
import { RequestGuardsDto } from './Dto/requestGuards.dto';
import { NotFoundError } from 'rxjs';
import { updateRequestGuardsDto } from './Dto/updaterequestGuards.Dto';

@Injectable()
export class requestGuardsService {

    constructor(@InjectModel(requestingGuards.name) private requestingGuardsModel:Model<requestingGuardsDocument>){}

    async saveRequestData(data: RequestGuardsDto): Promise<requestingGuards> {
        const newRequest = new this.requestingGuardsModel(data);
        return newRequest.save();
    }

    async getUserRequests(userId: string): Promise<requestingGuards[]>{
        return await this.requestingGuardsModel.find({userId}).exec();
    }

    async getAllRequests(): Promise<requestingGuards[]>{
        return this.requestingGuardsModel.find().exec();
    }

    async getRequest(id:string): Promise<requestingGuards>{
        const request = await this.requestingGuardsModel.findById(id).exec();
        if(!request){
            throw new HttpException('User Not Found', 404);
        }
        return request;
    }

    async updateRequest(id:string, updatedata:updateRequestGuardsDto):Promise<requestingGuards>{
        const updatedRequest = await this.requestingGuardsModel.findByIdAndUpdate(id, updatedata,{new:true}).exec();
        if(!updatedRequest){
            throw new HttpException('User Not Found', 404);
        }
        return updatedRequest;
    }

    async deleteRequest(id:string):Promise<{message:string}>{
        const deleteRequest = await this.requestingGuardsModel.findByIdAndDelete(id).exec();
        if(!deleteRequest){
            throw new HttpException('User Not Found', 404);
        }
        return{ message: `Request with ID ${id} has been deleted` };;
    }


}
