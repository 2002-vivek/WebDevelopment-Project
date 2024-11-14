import { IsNotEmpty, IsNumber, IsString, Min } from "@nestjs/class-validator";


export class serviceDto{
    @IsNotEmpty()
    @IsString()
    service:string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    count_of_guards:number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    cost: number;
}