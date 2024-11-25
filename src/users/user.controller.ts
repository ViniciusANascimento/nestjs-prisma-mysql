import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Post,
    Put, UseGuards, UseInterceptors,
} from "@nestjs/common";
import {CreateUserDTO} from "./dto/create-user.dto";
import {UpdatePutUserDto} from "./dto/update-put-user.dto";
import {UpdatePatchUserDto} from "./dto/update-patch-user.dto";
import {UserService} from "./user.service";
import {ParamId} from "../decorators/param-id.decorator";
import {Roles} from "../decorators/role.decorator";
import {Role} from "../enums/role.enum";
import {RoleGuard} from "../guards/role.guard";
import {AuthGuard} from "../guards/auth.guard";
import {LogInterceptor} from "../interceptors/log.interceptor";

@Roles(Role.ADMIN)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() data: CreateUserDTO){
        return this.userService.create(data);
    }

    @Get()
    async read(){
        return this.userService.list();
    }

    @Get(':id')
    async readOne(@ParamId() id: number){
        return this.userService.show(id);
    }

    @Put(':id')
    async update(@ParamId() id: number, @Body() data : UpdatePutUserDto){
        return this.userService.update(id, data);
    }

    @Patch(':id')
    async updatePartial(@ParamId() id: number,  @Body() data: UpdatePatchUserDto){

        return this.userService.updatePartial(id, data)
    }

    @Delete(':id')
    async delete(@ParamId() id: number){

        return this.userService.delete(id)
    }

}