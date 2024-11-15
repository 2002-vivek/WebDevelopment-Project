import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/role.enum';



@Controller('admin')

export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.adminService.createUser(createUserDto);
  }

  
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('users')
  @Roles(Role.Admin)
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }
  

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('users/:id')
  @Roles(Role.Admin, Role.User)
  async getUserById(@Param('id') id: string) {
    return this.adminService.getUserById(id);
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch('users/:id')
  @Roles(Role.Admin)
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.adminService.updateUser(id, updateUserDto);
  }



  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete('users/:id')
  @Roles(Role.Admin)
  async deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }
}
