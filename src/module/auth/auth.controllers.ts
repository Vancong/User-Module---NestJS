import { Body, Controller, Get, Post,Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { LocalAuthGuard } from "src/guards/local-auth.guard";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";


@Controller('auth')
export class AuthControllers {
    constructor(private readonly authService:AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() request) {
        return this.authService.login(request.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile') 
    getProfile(@Request() req) {
        return req.user;
    }
}