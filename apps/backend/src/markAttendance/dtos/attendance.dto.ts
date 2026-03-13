import { IsString, IsNotEmpty } from "class-validator"

export class MarkAttendanceDto {

    @IsString()
    @IsNotEmpty()
    userId: string

    @IsString()
    @IsNotEmpty()
    subjectId: string

    @IsString()
    @IsNotEmpty()
    status: "present" | "absent"

}