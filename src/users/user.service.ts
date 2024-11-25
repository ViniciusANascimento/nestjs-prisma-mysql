import {Injectable, NotFoundException} from "@nestjs/common";
import {CreateUserDTO} from "./dto/create-user.dto";
import {PrismaService} from "../prisma/prisma.service";
import {UpdatePutUserDto} from "./dto/update-put-user.dto";
import {UpdatePatchUserDto} from "./dto/update-patch-user.dto";
import * as bcrypt from'bcrypt';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {
    }

    async create(data: CreateUserDTO){

        data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

        return this.prisma.user.create({
            data
        });
    }

    async list(){
        return this.prisma.user.findMany();
    }

    async show(id: number){
        return this.prisma.user.findUnique({
            where:{id},
        });
    }

    async update(id:number, {email, password, name, birthAt, role}: UpdatePutUserDto){
        await this.exists(id)

        password = await bcrypt.hash(password, await bcrypt.genSalt());

        return this.prisma.user.update({
            data:{email, password, name, birthAt: birthAt ? new Date(birthAt) : null, role},
            where: {id}
        });
    }
    async updatePartial(id:number, {email, password, name, birthAt, role}: UpdatePatchUserDto){
        await this.exists(id)

        const data: any = {};
        if(name) data.name = name
        if(email) data.email = email
        if(birthAt) data.birthAt = birthAt
        if(password) data.password = await bcrypt.hash(password, await bcrypt.genSalt())
        if(role) data.role = role

        return this.prisma.user.update({
            data,
            where: {
                id
            }
        })
    }

    async delete(id:number){
        await this.exists(id)
        return this.prisma.user.delete({
            where:{id}
        })
    }

    async exists(id: number){
        if( !(await this.prisma.user.count({where:{id} }))){
            throw new NotFoundException(`User with id ${id} does not exist`);
        }
    }
}
