import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    name: string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    password: string;
}
