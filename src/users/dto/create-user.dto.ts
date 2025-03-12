import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    @IsString({ message: 'validation.isString' })
    @MinLength(2, { message: i18nValidationMessage('validation.minLength', { constraint: 2 }) })
    name: string;

    @ApiProperty({ example: 'johndoe', description: 'The username of the user' })
    @IsString({ message: 'validation.isString' })
    @MinLength(2, { message: i18nValidationMessage('validation.minLength', { constraint: 2 }) })
    username: string;

    @ApiProperty({ example: 'johndoe@email.com', description: 'The email of the user' })
    @IsString({ message: 'validation.isString' })
    @IsEmail(null, { message: i18nValidationMessage('validation.isEmail') })
    email: string;

    @ApiProperty({ example: '#SecurePassword123', description: 'The email of the user' })
    @IsString({ message: 'validation.isString' })
    @MinLength(8, { message: i18nValidationMessage('validation.minLength', { constraint: 8 }) })
    password: string;
}
