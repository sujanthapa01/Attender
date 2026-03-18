import {Controller,Post,Body} from "@nestjs/common"
import {CourseService} from "./course.service"
import {CourseDto} from "./dtos/course.dto"
@Controller("api/course")
export class CourseController {
    
constructor(private courseService: CourseService){}


@Post("getAllCourse")
get(@Body() courseDto : CourseDto){
    return this.courseService.GetUserCourse(courseDto.userId)
}

}