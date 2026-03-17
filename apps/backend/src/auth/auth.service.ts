import { Injectable, InternalServerErrorException, UnauthorizedException, BadRequestException } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { hashPassword, comparePassword } from "./utils/password.util"
import { generateJwtToken } from "./utils/jwt.util"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {  
    constructor(private db: PrismaService, private jwtService: JwtService) { }

    async create(data: any): Promise<{
        message: string
        user?: {
            id: string
            name: string
            email: string
            createdAt: Date
        }
    }> {
        const { email, name, password } = data

        try {
            if (!email || !password || !name ) {
                throw new BadRequestException("Missing required fields: email, password, name")
            }


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
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true
                }
            })

            return {
                message: `${email} registered successfully`,
                user
            }

        } catch (error) {
            console.error("Registration error:", error)
            if (error instanceof BadRequestException || error instanceof UnauthorizedException) {
                throw error
            }
            throw new InternalServerErrorException("Registration failed")
        }
    }

    async login(email: string, password: string): Promise<{
        message: string
        token: string  
        user: {
            id: string
            name: string
            email: string
        }
    }> {
        try {
         
            if (!email || !password) {
                throw new BadRequestException("Email and password are required")
            }

            const found = await this.db.user.findFirst({ 
                where: { email } 
            })

            if (!found) {
                throw new UnauthorizedException(`User with email "${email}" not found`)
            }

            const checkPass = await comparePassword(password, found.password)

            if (!checkPass) {
                throw new UnauthorizedException('Invalid password')
            }

            const token = await generateJwtToken({ email }, this.jwtService)  
            return {
                message: "Login successful",
                token: token.accessToken, 
                user: {
                    id: found.id,
                    name: found.name,
                    email: found.email
                }
            }

        } catch (error) {
            console.error("Login error:", error)
            if (error instanceof BadRequestException || error instanceof UnauthorizedException) {
                throw error
            }
            throw new InternalServerErrorException("Login failed")
        }
    }
}