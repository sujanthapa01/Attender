import {  InternalServerErrorException, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"

export async function markAttendance(userId: string, subjectId: string, status: "present" | "absent", db: PrismaService) {
    try {

        const user = await db.user.findUnique({
            where: { id: userId },
        })

        if(!user) {
            throw new NotFoundException("user not found 001")
        }


        const subject = await db.subject.findUnique({
            where: {id : subjectId}
        })

        if(!subject){
            throw new NotFoundException("subject not found")
        }

        const attendance = this.db.attendance.create({
            data: {
                userId: userId,
                subjectId: subjectId,
                status: status,
                date: new Date()
            }
        })


        return attendance

    } catch (error) {
        throw new InternalServerErrorException("Internal Server Error", error)
    }

}
