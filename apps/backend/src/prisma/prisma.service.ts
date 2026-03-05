import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common"
import { PrismaPostgresAdapter } from "@prisma/adapter-ppg"
import { PrismaClient } from "../../generated/prisma/client"


@Injectable()

export default class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {

        const connectionString = ""! as string

        if (!connectionString) {
            console.log("DBURL is missing in PrismaService")
            return
        }

        const adapter = new PrismaPostgresAdapter({ connectionString })
        super({ adapter })
    }

    async onModuleInit() {
        await this.$connect()
    }

    async onModuleDestroy() {
        await this.$disconnect()
    }
}