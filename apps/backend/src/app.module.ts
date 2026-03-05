import { Module } from '@nestjs/common';
import PrismaModule from "./prisma/prisma.module"
import EnvModule from "./config/env/env.module"
import { MarkAttendanceModule } from './markAttendance/markAttendance.module';
import AuthModule from "./auth/auth.module"
@Module({
  imports: [PrismaModule,EnvModule,MarkAttendanceModule,AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
