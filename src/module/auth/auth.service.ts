import { Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    private users = [
        { id: 1, username: 'admin1', password: '123456' },
        { id: 2, username: 'vancong', password: '123456' },
    ];
    login(dto:LoginDto) {
        const user=this.users.find(
            user => user.username===dto.username&& user.password===dto.password
        )
        if(!user) {
            return 'Login failed';
        }
        return 'Login successfully';
    }
}