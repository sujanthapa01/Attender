import {Module} from "@nestjs/common"
import {ConfigModule} from "@nestjs/config"
import {envSchima} from "./env.validation"


@Module({
    imports : [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: envSchima
        })
    ]
})


export default class EnvModule {}