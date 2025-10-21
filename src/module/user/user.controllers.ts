import { ChangePasswordDto } from "./dto/change-password.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entities";
import { UserService } from "./user.service";
import { Body, Controller, Get, Param, Patch, Post, Put,ParseIntPipe } from "@nestjs/common";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() dto: CreateUserDto):Promise<User> {
        return await this.userService.createUser(dto);
    }

    @Get(':id')
    async getDetailUser(@Param('id',ParseIntPipe) id:number) :Promise<User> {
        return await this.userService.getDetailUser(id)
    }


    @Put(':id')
    async updateUser(@Body() dto:UpdateUserDto,@Param('id',ParseIntPipe) id:number):Promise<string> {
        return await this.userService.updateUser(id,dto);
    }

    @Get() 
    async getAllUser():Promise<User[]> {
        return await this.userService.getAllUser();
    }

    @Patch(':id/change-password')
    async changePassword(@Param('id',ParseIntPipe) id:number,@Body() dto: ChangePasswordDto):Promise<string> {
        return await this.userService.changePassword(id,dto);
    }

}
