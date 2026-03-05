import {Body, Controller,Post} from "@nestjs/common"
import AuthService from "./auth.service"
import { CreateUserDto,UserLoginDto} from "./dto/auth.dto"

@Controller('api/auth')
export default class AuthController {
    constructor (private auth: AuthService){}

    @Post('register')
    async register(@Body() createUserDto:CreateUserDto){
        return this.auth.create(createUserDto)
    }

    @Post('login')
    async login(@Body() userLoginDto : UserLoginDto ){
        return this.auth.login(userLoginDto.email,userLoginDto.password)
    }



}