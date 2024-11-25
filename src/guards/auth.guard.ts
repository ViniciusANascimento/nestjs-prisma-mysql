import {CanActivate, ExecutionContext, forwardRef, Inject, Injectable} from "@nestjs/common";
import {AuthService} from "../auth/auth.service";
import {UserService} from "../users/user.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ){}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const {authorization} = request.headers;

        try{
            const data =  await this.authService.checkToken((authorization ?? '').split(' ')[1]);

            request.tokenPayload = data;
            request.user = await this.userService.show(data.id)
            return true;
        }catch (err){
            return false;
        }


    }

}