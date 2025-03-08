import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(data: LoginDto): Promise<import("./types/auth.types").AuthResponse>;
    register(data: RegisterDto): Promise<import("./types/auth.types").AuthResponse>;
    getUserInfo(request: any): Promise<import("./types/auth.types").AuthResponse>;
}
