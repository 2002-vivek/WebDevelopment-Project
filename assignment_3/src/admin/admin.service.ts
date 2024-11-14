import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo, MongooseError } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<{ message: string }> {

    try{
      const hashedPassword = await bcrypt.hash(createUserDto.password,10);
      const newUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });
      await newUser.save();
      if(newUser){
        return {message: 'User Created'}
      }
      return {message: 'Error'}

    } catch(error){
      if(error instanceof mongo.MongoServerError && error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
    

    
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException('User Not Found', 404);
    }
    return user;
  }

  async findByEmail(email:string): Promise<User | null>{
    return this.userModel.findOne({email}).exec();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(updateUserDto.password,10);
    const updatedUser = await this.userModel.findByIdAndUpdate(id, {
      ...updateUserDto,
      password: hashedPassword,
    }, { new: true }).exec();
    if (!updatedUser) {
      throw new HttpException('User Not Found', 404);
    }
    return updatedUser;
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new HttpException('User Not Found', 404);
    }
    return { message: `User with ID ${id} has been deleted` };
  }
}
