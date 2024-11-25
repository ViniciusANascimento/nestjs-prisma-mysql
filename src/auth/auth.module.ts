import {forwardRef, Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {AppController} from "../app.controller";
import {UserModule} from "../users/user.module";
import {PrismaModule} from "../prisma/prisma.module";
import {AuthService} from "./auth.service";
import * as process from "node:process";
import {FileModule} from "../file/file.module";
import {AuthController} from "./auth.controller";


@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            }),
        forwardRef(() =>UserModule),
        PrismaModule,
        FileModule
    ],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}