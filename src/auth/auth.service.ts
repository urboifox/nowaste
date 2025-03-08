import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse } from './types/auth.types';
import { UserResponse } from '../users/entities/user-response.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async authenticate(email: string, password: string): Promise<AuthResponse> {
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.signIn(user);
    }

    async register(data: RegisterDto): Promise<AuthResponse> {
        const existingUser = await this.userService.findOneByEmail(data.email);
        if (existingUser) {
            throw new BadRequestException('Email already in use');
        }

        const hashedPassword = await this.hashPassword(data.password);

        const createdUser = await this.userService.create({ ...data, password: hashedPassword });

        return this.signIn(createdUser);
    }

    async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }

    async validateUser(email: string, password: string): Promise<UserResponse | null> {
        const user = await this.userService.findOneByEmail(email);
        if (!user) return null;

        const isPasswordValid = await this.comparePassword(password, user.password);
        if (!isPasswordValid) return null;

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async signIn(user: UserResponse) {
        const token = await this.jwtService.signAsync({ userId: user.id });

        return { user, token };
    }

    async getUserInfo(userId: number): Promise<AuthResponse> {
        const user = await this.userService.findOne(userId);

        if (!user) {
            throw new UnauthorizedException();
        }

        return this.signIn(user);
    }
}
