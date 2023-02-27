import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: "You must provide a username",
    })
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: "You must provide a password",
    })
    @IsNotEmpty()
    @Length(4, 20)
    password: string;
}