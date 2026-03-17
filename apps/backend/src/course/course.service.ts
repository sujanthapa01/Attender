import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service"


@Injectable()
export class CourseService {
    constructor(private db: PrismaService) { }


    async GetUserCourse(userId) {
        try {
            if (!userId) {
                throw new BadRequestException('userId is missing')
            }

            const userCourse = await this.db.userCourse.findMany({
                where: { id: userId },
                include: {
                    course: true
                }
            })

            if (!userCourse) {
                throw new BadRequestException('userCourse not found')
            }

            return {
                message: "user Course Fetched Successfully",
                courses: userCourse.map(c => c.course)
            }

        } catch (err) {
            console.log(err)
            return err
        }
    }

    async createUserCourse(userId, CourseName) {

        try {

            if (!userId) {
                throw new BadRequestException('userId and Email are required')
            }

            if (!CourseName) {
                throw new BadRequestException('set a name for course')
            }

            const already = await this.db.course.findFirst({ where: { name: CourseName } })

            if (already) {
                throw new BadRequestException('this course alrady exist')
            }

            const response = await this.db.$transaction(async (tx) => {

                // create Course
                const course = await this.db.course.create({
                    data: {
                        name: CourseName
                    }
                })

                if (!course) {
                    return {
                        message: "falid to create course"
                    }
                }
                // join course
                await this.db.userCourse.create({
                    data: {
                        userId: userId,
                        courseId: course.id
                    }
                })

                return course
            })


            return {
                message: "Course created and joined successfully",
                course: response
            }


        } catch (err) { return err }
    }

}