import {
    IsString,
    IsNotEmpty,
    IsEmail,
    MinLength,
    Matches
} from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty({ message: "Name is required" })
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail({}, { message: "Invalid email format" })
    email: string;


    @IsString()
    @MinLength(6, { message: "Password must be at least 6 characters" })
    @Matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/,
        {
            message:
                "Password must contain uppercase, lowercase, and a number",
        },
    )
    password: string;


    @IsString()
    @IsNotEmpty({ message: "Course ID is required" })
    courseId: string;
}


export class UserLoginDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail({}, { message: "Invalid email format" })
    email: string;

    @IsString()
    @MinLength(6, { message: "Password must be at least 6 characters" })
    @Matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/,
        {
            message:
                "Password must contain uppercase, lowercase, and a number",
        },
    )
    password: string;

}