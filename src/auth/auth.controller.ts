import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { RegisterDto } from './dto/register.dto';

class LoginResponse {
    user: User;
    token: string;
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiResponse({ status: 200, type: LoginResponse })
    login(@Body(ValidationPipe) data: LoginDto) {
        return this.authService.authenticate(data.email, data.password);
    }

    @Post('register')
    @ApiResponse({ status: 200, type: LoginResponse })
    register(@Body(ValidationPipe) data: RegisterDto) {
        return this.authService.register(data);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    @ApiResponse({ status: 200, type: User })
    getUserInfo(@Request() request: any) {
        return this.authService.getUserInfo(+request.user.userId);
    }
}
