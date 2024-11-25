import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {User} from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";
import {AuthRegisterDto} from "./dto/auth-register.dto";
import {UserService} from "../users/user.service";
import * as bcrypt from 'bcrypt';
import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
        private readonly mailer: MailerService,
    ) {}

    async createToken(user: User) {
        return {
            accessToken: this.jwtService.sign({
                    id: user.id,
                    name: user.name,
                    email: user.email
                },{
                    expiresIn: "7 days",
                    subject: String(user.id),
                    issuer: 'Login',
                    audience: 'users',
                }
            )
        }
    }

    checkToken(token: string){
        try {
            const data = this.jwtService.verify(token, {
                audience: 'users',
                issuer: 'login'
            })
            return data;
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async login(email: string, password: string){
        const user = await this.prisma.user.findFirst({
            where:{email}
        })

        if(!user){
            throw new UnauthorizedException("User or Email incorrect");
        }

        if(!await bcrypt.compare(password,user.password)){
            throw new UnauthorizedException("User or Email incorrect");
        }

        return this.createToken(user);
    }

    async forget(email: string){
        const user = await this.prisma.user.findFirst({
            where:{email},
        })

        if(!user){
            throw new UnauthorizedException("Email incorrect");
        }

        const token = this.jwtService.sign(
            {
                id: user.id
            },
            {
                expiresIn: "30 minutes",
                subject: String(user.id),
                issuer: 'forget',
                audience: 'users',
            }
        )

        await this.mailer.sendMail({
            subject: 'Recuperação de senha',
            to:'joao@mail.com.br',
            template: 'forget',
            context:{
                name: user.name,
                token
            }
        })
        return true;
    }

    async reset(password: string, token: string){

        try {
            const data = this.jwtService.verify(token, {
                issuer: 'forget',
                audience: 'users',
            });

            if(isNaN(Number(data.id))){
                throw new BadRequestException("Token incorrect");
            }
            password = await bcrypt.hash(password, await bcrypt.genSalt())
            const user = await this.prisma.user.update({
                where:{
                    id: Number(data.id),
                },
                data:{
                    password
                }
            })
            return this.createToken(user)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async register(data: AuthRegisterDto) {
        const user = await this.userService.create(data);

        return this.createToken(user);
    }

    async isValidToken(token: string){
        try {
            this.checkToken(token);
            return true;
        }catch (err){
            return false
        }
    }
}