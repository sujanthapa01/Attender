import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common"
import PrismaService from "src/prisma/prisma.service"
import { TUser } from "./types/auth.type"
import { hashPassword, comparePassword } from "./utils/password.util"
import { generateJwtToken } from "./utils/jwt.util"
import { JwtService } from "@nestjs/jwt"
// import {User} from "../../generated/prisma"

type T = {
    email: string;
    courseId: string;
    name: string;
    password: string;
    createdAt: Date;
}

@Injectable()
export default class AuthService {
    constructor(private db: PrismaService, private jwtService: JwtService) { }

    async create(
        data: any
    ): Promise<{
        message: string
        user?: {
            id: string
            name: string
            email: string
            courseId: string
            createdAt: Date
        }
    }> {

        const { email, courseId, name, password } = data

        try {

            const alreadyExist = await this.db.user.findUnique({
                where: { email }
            })

            if (alreadyExist) {
                return {
                    message: `${email} already registered`
                }
            }

            const hash = await hashPassword(password)

            const user = await this.db.user.create({
                data: {
                    name,
                    email,
                    password: hash,
                    courseId
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    courseId: true,
                    createdAt: true
                }
            })

            return {
                message: `${email} registered successfully`,
                user
            }

        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException("Internal server error")
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
            throw new InternalServerErrorException(error.message)
        }
    }

}