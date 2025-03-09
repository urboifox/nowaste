import { UserResponse } from "src/users/entities/user-response.entity";

export interface JwtPayload {
    userId: number;
    exp?: number;
    iat?: number;
};

export interface AuthResponse {
    user: UserResponse;
    token: string;
};
