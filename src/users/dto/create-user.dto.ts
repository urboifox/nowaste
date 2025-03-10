import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    @IsString()
    @MinLength(2)
    name: string;

    @ApiProperty({ example: 'johndoe', description: 'The username of the user' })
    @IsString()
    @MinLength(2)
    username: string;

    @ApiProperty({ example: 'johndoe@email.com', description: 'The email of the user' })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ example: '#SecurePassword123', description: 'The email of the user' })
    @IsString()
    @MinLength(8)
    password: string;
}
