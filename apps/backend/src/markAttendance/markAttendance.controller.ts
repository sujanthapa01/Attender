import {Controller,Post,Body} from "@nestjs/common"
import {MarkAttendance} from "./markAttendance.service"
import {MarkAttendanceDto} from "./dtos/attendance.dto"

@Controller('api/attendance')
export class MarkAttendanceController {

    constructor(private attendanceService:MarkAttendance){}

    @Post('mark')
    async mark(@Body() markAttendancedto: MarkAttendanceDto  ){
console.log(markAttendancedto)
        return this.attendanceService.mark(markAttendancedto.userId,markAttendancedto.subjectId,markAttendancedto.status)
    }

}
