"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async authenticate(email, password) {
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return this.signIn(user);
    }
    async register(data) {
        const existingUser = await this.userService.findOneByEmail(data.email);
        if (existingUser) {
            throw new common_1.BadRequestException('Email already in use');
        }
        const hashedPassword = await this.hashPassword(data.password);
        const createdUser = await this.userService.create({ ...data, password: hashedPassword });
        return this.signIn(createdUser);
    }
    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
    async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
    async validateUser(email, password) {
        const user = await this.userService.findOneByEmail(email);
        if (!user)
            return null;
        const isPasswordValid = await this.comparePassword(password, user.password);
        if (!isPasswordValid)
            return null;
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async signIn(user) {
        const token = await this.jwtService.signAsync({ userId: user.id });
        return { user, token };
    }
    async getUserInfo(userId) {
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return this.signIn(user);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map