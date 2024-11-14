import { ArrayMinSize, IsNotEmpty, IsNumber, ValidateNested } from "@nestjs/class-validator";
import { Type } from 'class-transformer';
import { serviceDto } from "./service.Dto";
import { IsString } from "class-validator";

export class RequestGuardsDto{
    @IsNotEmpty()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @Type(()=> serviceDto)
    services:serviceDto[];

    @IsNumber()
    @IsNotEmpty()
    total_cost:number;

    @IsString()
    @IsNotEmpty()
    userId: string;

}