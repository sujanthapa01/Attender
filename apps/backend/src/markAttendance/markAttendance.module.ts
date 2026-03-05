import {Module} from "@nestjs/common"
import MarkAttendanceService from "./markAttendance.service"
@Module({
    controllers : [],
    providers : [MarkAttendanceService],
    exports : []
})

export class MarkAttendanceModule {}