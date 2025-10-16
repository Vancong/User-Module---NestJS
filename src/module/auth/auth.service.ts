import { Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
@Injectable()

export class AuthService {
    private users = [
        { id: 1, username: 'admin1', password: '123456' },
        { id: 2, username: 'vancong', password: '123456' },
    ];
    constructor(private jwtService: JwtService) {}
    login(user:any) {
        const payload={username:user.username,userId:user.id};
        const token= this.jwtService.sign(payload);

        return {
            message: 'Login successfully',
            access_token: token,
        }
    }

    async validateUser(username:string,password:string) {
        const user=this.users.find(
            user => user.username===username&&password===user.password
        );  
        if(!user){
            return null;
        }

        // const status= await bcrypt.compare(password,user.password);
        // if(status) {
        //     return user;
        // }
        return user;
    }
}