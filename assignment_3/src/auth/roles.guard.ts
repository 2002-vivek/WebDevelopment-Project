import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Role } from "./role.enum";
import { ROLES_KEY } from "./decorators/role.decorator";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(
        private reflector:Reflector,
        private jwtService:JwtService
    ){}

    canActivate(context: ExecutionContext): boolean  {
        const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if(!roles){
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if(!user){
            throw new ForbiddenException('User not found!');
        }
        const userRoles = user.roles as Role[];
        if(!userRoles.some(role => roles.includes(role))){
            throw new ForbiddenException('Access Denied');
        }
        return true;
    }
}