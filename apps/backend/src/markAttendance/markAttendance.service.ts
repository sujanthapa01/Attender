import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import {PrismaService} from "../prisma/prisma.service"


@Injectable()
export class MarkAttendance {
    constructor(private db: PrismaService, private configService: ConfigService) { }


    async markAttendance(userId: string, status: "present" | "absent") {
        try {

            // const res = this.db.attendance.create({
            //     data : {
            //         userId : userId
            //     }
            // })

        } catch (error) {
            throw new InternalServerErrorException("Internal Server Error", error)
        }

    }


}