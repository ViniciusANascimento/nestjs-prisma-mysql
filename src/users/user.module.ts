import {forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {PrismaModule} from "../prisma/prisma.module";
import {UserIdCheckMiddleware} from "../middlewares/user-id-check.middleware";
import {AuthModule} from "../auth/auth.module";
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "../guards/auth.guard";
import {ThrottlerGuard} from "@nestjs/throttler";

@Module({
    imports: [PrismaModule, forwardRef(() => AuthModule)],
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        }
    ],
    exports: [UserService]
})
export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer){
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path:'/users/:id',
            method: RequestMethod.ALL,
        })
    }
}