import { IsEmail, IsNotEmpty } from "@nestjs/class-validator";

export class SubscribeDto{
    @IsEmail()
    @IsNotEmpty()
    email:string;
}