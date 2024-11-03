import {IsEmail, IsNotEmpty, IsOptional, IsString, Matches} from '@nestjs/class-validator';
export class CreateContactUsDto{
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsEmail()
    email: string;
  
    @IsOptional()
    @IsString()
    company?: string;

    @IsNotEmpty()
    @IsString()
    phone: string;
  
    @IsNotEmpty()
    @IsString()
    message: string;
}