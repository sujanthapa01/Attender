import { Module } from '@nestjs/common';
import PrismaModule from "./prisma/prisma.module"
import EnvModule from "./config/env/env.module"
@Module({
  imports: [PrismaModule,EnvModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
