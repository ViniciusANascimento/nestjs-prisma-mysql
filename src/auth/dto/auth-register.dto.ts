import {IsEmail, IsString, MinLength} from "class-validator";
import {CreateUserDTO} from "../../users/dto/create-user.dto";

export class AuthRegisterDto extends CreateUserDTO{
}