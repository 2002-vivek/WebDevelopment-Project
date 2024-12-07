import { ArrayMinSize, IsNotEmpty, IsNumber, ValidateNested } from "@nestjs/class-validator";
import { Type } from 'class-transformer';
import { serviceDto } from "./service.Dto";
import { IsOptional, Min } from "class-validator";

export class updateRequestGuardsDto{
    @IsOptional()
    @ValidateNested({each: true})
    @Type(()=> serviceDto)
    services?:serviceDto[];

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    total_cost?:number;

}