import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaPostgresAdapter } from "@prisma/adapter-ppg";
import { PrismaClient } from "../../generated/prisma/client";
import { ConfigService } from "@nestjs/config";

@Injectable()
export default class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {

  constructor(private configService: ConfigService) {

    const connectionString = configService.get<string>("DATABASE_URL");

    if (!connectionString) {
      throw new Error("DATABASE_URL is missing in .env");
    }

    const adapter = new PrismaPostgresAdapter({ connectionString });

    super({
      adapter,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}