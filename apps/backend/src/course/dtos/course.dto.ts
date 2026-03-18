import {IsString,IsNotEmpty} from "class-validator"

export class CourseDto {
    @IsString()
    @IsNotEmpty()
    userId : string
}