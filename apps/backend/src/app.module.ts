import { Module } from '@nestjs/common';
import {PrismaModule} from "./prisma/prisma.module"
import {EnvModule} from "./config/env/env.module"
import { MarkAttendanceModule } from './markAttendance/markAttendance.module';
import {AuthModule} from "./auth/auth.module"
import {APP_GUARD} from "@nestjs/core"
import  {JwtGuard} from "./auth/auth.guard"
import {CourseModule} from "./course/course.module"
@Module({
  
  imports: [PrismaModule,EnvModule,MarkAttendanceModule,AuthModule,CourseModule],
  controllers: [],
  providers: [{
    provide : APP_GUARD,
     useClass: JwtGuard,
  }],
})
export class AppModule {}
