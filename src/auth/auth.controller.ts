import {
    BadRequestException,
    Body,
    Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe,
    Post,
    Req,
    Res,
    UploadedFile, UploadedFiles,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {AuthLoginDto} from "./dto/auth-login.dto";
import {AuthRegisterDto} from "./dto/auth-register.dto";
import {AuthForgetDTO} from "./dto/auth-forget.dto";
import {AuthResetDTO} from "./dto/auth-reset.dto";
import {UserService} from "../users/user.service";
import {AuthService} from "./auth.service";
import {AuthGuard} from "../guards/auth.guard";
import {User} from "../decorators/user.decorator";
import {FileFieldsInterceptor, FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import{join} from 'path'
import {FileService} from "../file/file.service";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly fileService: FileService,
    ) {}

    @Post('login')
    async login(@Body() {email, password}: AuthLoginDto) {
        return this.authService.login(email,password)
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDto) {
        return this.authService.register(body)
    }

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO) {
        return this.authService.forget(email)
    }

    @Post('reset')
    async reset(@Body() {password, token}: AuthResetDTO) {
        return this.authService.reset(password,token)
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(
        @User() user,
        @UploadedFile(new ParseFilePipe({
            validators: [
                new FileTypeValidator({fileType: 'image/png'}),
                new MaxFileSizeValidator({maxSize: 1024 * 50})
            ]
        })) photo: Express.Multer.File)
    {
        const path: string = join(__dirname, '..', '..', 'storage', 'photo', `photo-${user.id}.png`);
        try{
            await this.fileService.uploadFile(photo, path);
        }catch (err){
            throw new BadRequestException(err);
        }

        return {success: true};
    }

    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(AuthGuard)
    @Post('files')
    async uploadFiles(@User() user, @UploadedFiles() files: Express.Multer.File[]){
        return files
    }

    @UseInterceptors(FileFieldsInterceptor(
        [
            {
            name: 'photo',
            maxCount: 1},
            {
                name: 'documents',
                maxCount: 10
            }
        ]
    ))
    @UseGuards(AuthGuard)
    @Post('files-fields')
    async uploadFilesFields(@User() user, @UploadedFiles() files: {photo: Express.Multer.File, documents: Express.Multer.File[]}) {
        return files
    }

}