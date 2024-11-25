import {CanActivate, ExecutionContext} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {ROLES_KEYS} from "../decorators/role.decorator";
import {Role} from "../enums/role.enum";

export class RoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext){

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEYS,[context.getHandler(), context.getClass()])

        if(!requiredRoles) return true;

        const {user} = context.switchToHttp().getRequest();
        const rolesFilted = requiredRoles.filter(role => role === user.role)

        return rolesFilted.length > 0;


    }
}