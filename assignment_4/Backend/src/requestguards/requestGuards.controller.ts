import { Body, Controller, Delete, Get, HttpException, Param, Request, Patch, Post, UseGuards } from '@nestjs/common';
import { requestGuardsService } from './requestGuards.service';
import { RequestGuardsDto } from './Dto/requestGuards.dto';
import { updateRequestGuardsDto } from './Dto/updaterequestGuards.Dto';
import mongoose from 'mongoose';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/role.enum';



@Controller('requestguards')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RequestguardsController {
  constructor(private readonly requestguardsService: requestGuardsService) {}

  @Post()
  async handleRequest(@Body() requestData:RequestGuardsDto){
    
    const savedRequest = await this.requestguardsService.saveRequestData(requestData);
    return { success: true, message: 'Guard request saved successfully.', data: savedRequest };
  }

  @Get('user')
  async getUserRequests(@Request() req: any) {
    const userId = req.user.userId;
    return this.requestguardsService.getUserRequests(userId);
  }

  @Get('admin')
  @Roles(Role.Admin, Role.User)
  async getAllRequests(){
     return this.requestguardsService.getAllRequests();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  async getRequest(@Param('id') id: string){
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException('User Not Found', 404);
    return this.requestguardsService.getRequest(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.User)
  async updateRequest(@Param('id') id:string, @Body() updateData:updateRequestGuardsDto){
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException('User Not Found', 404);
    return this.requestguardsService.updateRequest(id,updateData);
  }
  
  @Delete(':id')
  @Roles(Role.Admin, Role.User)
  async deleteRequest(@Param('id') id:string){
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException('User Not Found', 404);
    return this.requestguardsService.deleteRequest(id);
  }

}
