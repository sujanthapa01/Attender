import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common"
import PrismaService from "src/prisma/prisma.service"
import { TUser } from "./types/auth.type"
import { hashPassword, comparePassword } from "./utils/password.util"
import { generateJwtToken } from "./utils/jwt.util"
import { JwtService } from "@nestjs/jwt"

type T = {
    email: string;
    courseId: string;
    name: string;
    password: string;
    id: string;
    createdAt: Date;
}

@Injectable()
export default class AuthService {
    constructor(private db: PrismaService, private jwtService: JwtService) { }

    async create(data: TUser): Promise<{ message: string, user?: T }> {

        const { email, courseId, name, password } = data

        try {

            const alreadyExist = await this.db.user.findFirst({ where: { email } })

            if (alreadyExist) {
                return {
                    message: `${email} already registred`

                }
            }

            const hash = await hashPassword(password);


            const user = await this.db.user.create({
                data: {
                    name,
                    email,
                    password: hash,
                    courseId
                }
            })

            return {
                message: `${email} registred sucessfully`,
                user
            }

        } catch (error) {
            throw new InternalServerErrorException('internal server error', error)
        }

    }

    async login(email: string, password: string) {

        try {
            const found: T | null = await this.db.user.findFirst({ where: { email } })

            if (!found) {
                throw new UnauthorizedException(`${email} not found`)
            }

            const checkPass = await comparePassword(password, found.password)

            if (!checkPass) {
                throw new UnauthorizedException('wrong password!')
            }

            generateJwtToken({ email }, this.jwtService)


        } catch (error) {
            throw new InternalServerErrorException('Internal Server Error', error)
        }
    }

}