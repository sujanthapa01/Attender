import {Module} from "@nestjs/common"
import {MarkAttendance} from "./markAttendance.service"
import {MarkAttendanceController} from "./markAttendance.controller"
@Module({
    controllers : [MarkAttendanceController],
    providers : [MarkAttendance],
    exports : []
})

export class MarkAttendanceModule {}