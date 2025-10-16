import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";

export interface User {
    id: number;
    username:string;
    email:string;
    password:string;
}

@Injectable()
export class UserService {

    private users:User[]=[]
    createUser(dto:CreateUserDto):User {
       const user={id:Date.now(),...dto};
       this.users.push(user);
       return user;
    }

    getDetailUser(id:number):User {
        const user= this.users.find(user=> user.id===id)
        if(!user) {
            throw new Error('User not found');
        }
        return user;
    }
    getAllUser():User[] {
        return this.users
    }

    updateUser(id:number,dto:Partial<CreateUserDto>):string {
        const userIndex=this.users.findIndex(user =>user.id===id)
        if(userIndex===-1){
            throw new Error('User not found')
        }
        this.users[userIndex]={...this.users[userIndex],...dto};
        return 'User updated successfully';
    }

    changePassword(id:number,dto: ChangePasswordDto):string {
    
        if(dto.newPassword !== dto.confirmPassword) {
            throw new Error('Password and confirm password do not match');
        }
        const userIndex=this.users.findIndex(user=> user.id===id);
        if(userIndex===-1) {
            throw new Error('User not found');
        }
        if(this.users[userIndex].password !== dto.oldPassword) {
            throw new Error('Old password is incorrect');
        }

        this.users[userIndex].password=dto.newPassword;
        return 'Password changed successfully';


    }
    
}