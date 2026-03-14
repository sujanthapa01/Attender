import { Body, Controller, Post, Get } from "@nestjs/common"
import {AuthService} from "./auth.service"
import { CreateUserDto, UserLoginDto } from "./dto/auth.dto"
import { IsPublic } from "src/decorator/isPublic.decorator"

@Controller('api/auth')
export class AuthController {
    constructor(private auth: AuthService) { }

    @IsPublic()
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.auth.create(createUserDto)
    }
@IsPublic()
    @Post('login')
    async login(@Body() userLoginDto: UserLoginDto) {

        console.log(userLoginDto.email, userLoginDto.password)
        return this.auth.login(userLoginDto.email, userLoginDto.password)
    }

    @IsPublic()
    @Get('greet')
    greet() {
        return {
            message: "api/auth/* are up and running",
            status: 200
        }
    }



}