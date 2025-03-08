import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse } from './types/auth.types';
import { UserResponse } from 'src/users/entities/user-response.entity';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    authenticate(email: string, password: string): Promise<AuthResponse>;
    register(data: RegisterDto): Promise<AuthResponse>;
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
    validateUser(email: string, password: string): Promise<UserResponse | null>;
    signIn(user: UserResponse): Promise<{
        user: UserResponse;
        token: string;
    }>;
    getUserInfo(userId: number): Promise<AuthResponse>;
}
