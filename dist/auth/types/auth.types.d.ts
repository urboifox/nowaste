import { User } from 'src/users/entities/user.entity';
export interface JwtPayload {
    userId: number;
    exp?: number;
    iat?: number;
}
export interface AuthResponse {
    user: Omit<User, 'password'>;
    token: string;
}
