import { IsEmpty, IsNotEmpty, IsString } from "class-validator";


export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    oldPassword:string;

    @IsNotEmpty()
    @IsString()
    newPassword:string;

    @IsNotEmpty()
    @IsString()
    confirmPassword?:string;
}