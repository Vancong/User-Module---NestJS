import { Module } from "@nestjs/common";
import { AuthControllers } from "./auth.controllers";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import { LocalStrategy } from "src/passports/local.strategy";
import { JwtStrategy } from "src/passports/jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";



@Module({
    controllers: [AuthControllers],
    providers: [AuthService,LocalStrategy,JwtStrategy],
    imports:[
        PassportModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports:[],
            inject:[ConfigService],
            useFactory: async (config:ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: {expiresIn: '1h'}
            })
        })
    ]
})
export class AuthModule {}