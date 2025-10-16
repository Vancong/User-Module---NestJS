import { Module } from "@nestjs/common";
import { AuthControllers } from "./auth.controllers";
import { AuthService } from "./auth.service";


@Module({
    controllers: [AuthControllers],
    providers: [AuthService],
    imports:[]
})
export class AuthModule {}