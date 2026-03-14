import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PrismaService } from "../prisma/prisma.service"
import { markAttendance } from "./helpers/functions"


@Injectable()
export class MarkAttendance {
    constructor(private db: PrismaService, private configService: ConfigService) { }

    async mark(userId: string, subjectId: string, status: 'present' | 'absent') {
       return markAttendance(userId, subjectId, status, this.db)
    }

}