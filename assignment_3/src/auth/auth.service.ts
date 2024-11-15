import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import * as bcrypt from 'bcryptjs';
import { Role } from './role.enum';

@Injectable()
export class AuthService {
    constructor(
        private readonly adminsService:AdminService,
        private readonly jwtService: JwtService
    ){}

    async validateUser(email:string, pass:string): Promise<any>{
        const user = await this.adminsService.findByEmail(email);
        if(user && (await bcrypt.compare(pass,user.password))){
            const {password, ...result} = user;
            return result;
        }
        throw new UnauthorizedException('Invalid Credentials');
    }

    async login(user:any) {
        const userData = user._doc;
        const payload = {email: userData.email, sub: userData._id, roles: userData.roles};
        return{
            access_token: this.jwtService.sign(payload)
        }
    }
}
