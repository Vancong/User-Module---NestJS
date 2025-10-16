import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "src/module/auth/auth.service";
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy  extends PassportStrategy(Strategy) {
    constructor(private readonly authService:AuthService) {
        super({ usernameField: 'username',passwordField: 'password' });
    }
    async validate(username:string,password:string) {
        const user= await this.authService.validateUser(username,password);
        if(!user) {
            return null;
        }
        return user
    }
}