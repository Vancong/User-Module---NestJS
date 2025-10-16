import { ChangePasswordDto } from "./dto/change-password.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";
import type { User } from "./user.service";
import { Body, Controller, Get, Param, Patch, Post, Put,ParseIntPipe } from "@nestjs/common";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() dto: CreateUserDto):Promise<User> {
        return await this.userService.createUser(dto);
    }

    @Get(':id')
    getDetailUser(@Param('id',ParseIntPipe) id:number) :User {
        return this.userService.getDetailUser(id)
    }


    @Put(':id')
    updateUser(@Body() dto:UpdateUserDto,@Param('id',ParseIntPipe) id:number):string {
        return this.userService.updateUser(id,dto);
    }

    @Get() 
    getAllUser():User[] {
        return this.userService.getAllUser();
    }

    @Patch(':id/change-password')
    changePassword(@Param('id',ParseIntPipe) id:number,@Body() dto: ChangePasswordDto):string {
        return this.userService.changePassword(id,dto);
    }

}
