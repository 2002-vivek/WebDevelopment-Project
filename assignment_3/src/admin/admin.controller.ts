import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { AuthGuard } from '@nestjs/passport';




@Controller('admin')

export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.adminService.createUser(createUserDto);
  }

  
  @UseGuards(AuthGuard('jwt'))
  @Get('users')

  async getAllUsers() {
    return this.adminService.getAllUsers();
  }
  

  @UseGuards(AuthGuard('jwt'))
  @Get('users/:id')
 
  async getUserById(@Param('id') id: string) {
    return this.adminService.getUserById(id);
  }


  @UseGuards(AuthGuard('jwt'))
  @Patch('users/:id')

  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.adminService.updateUser(id, updateUserDto);
  }


  @UseGuards(AuthGuard('jwt'))
  @Delete('users/:id')

  async deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }
}
