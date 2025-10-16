import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MaxLength(12)
    @IsNotEmpty()
    username:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;


    @IsNotEmpty()
    @IsString()
    password:string;

}