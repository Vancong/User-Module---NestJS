import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import * as bcrypt from 'bcrypt';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entities";
import { Repository } from "typeorm";


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ){}

    async createUser(dto:CreateUserDto):Promise<User> {
       const user=this.userRepo.create({...dto})
       return await this.userRepo.save(user);
    }

    async getDetailUser(id:number):Promise<User> {
        const user= await this.userRepo.findOneBy({id})
        if(!user) {
            throw new Error('User not found');
        }
        return user;
    }
    async getAllUser():Promise<User[]> {
        return await this.userRepo.find();
    }

    async updateUser(id:number,dto:Partial<CreateUserDto>):Promise<string> {
        const user=await this.userRepo.findOneBy({id})
        if(!user){
            throw new Error('User not found')
        }
        await this.userRepo.update(id,dto)
        return 'User updated successfully';
    }

    async changePassword(id:number,dto: ChangePasswordDto):Promise<string> {
    
        if(dto.newPassword !== dto.confirmPassword) {
            throw new Error('Password and confirm password do not match');
        }
        const user=await this.userRepo.findOneBy({id});
        if(!user) {
            throw new Error('User not found');
        }
        if(user.password !== dto.oldPassword) {
            throw new Error('Old password is incorrect');
        }

        user.password=dto.newPassword;
        await await this.userRepo.save(user)
        return 'Password changed successfully';


    }
    
}