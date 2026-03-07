import {Module} from "@nestjs/common"
import {MarkAttendance} from "./markAttendance.service"
@Module({
    controllers : [],
    providers : [MarkAttendance],
    exports : []
})

export class MarkAttendanceModule {}