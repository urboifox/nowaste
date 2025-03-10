import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    @IsString()
    @MinLength(2)
    @IsOptional()
    name?: string;

    @ApiProperty({ example: 'johndoe', description: 'The username of the user' })
    @IsString()
    @MinLength(2)
    @IsOptional()
    username?: string;

    @ApiProperty({ example: 'johndoe@email.com', description: 'The email of the user' })
    @IsString()
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({ example: '#SecurePassword123', description: 'The email of the user' })
    @IsString()
    @MinLength(8)
    @IsOptional()
    password?: string;
}
