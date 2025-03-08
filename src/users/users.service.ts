import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponse } from './entities/user-response.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(private db: PrismaService) {}

    private notFound() {
        throw new NotFoundException('User not found');
    }

    async create(createUserDto: CreateUserDto): Promise<UserResponse> {
        return this.db.user.create({ data: createUserDto });
    }

    async findAll(): Promise<UserResponse[]> {
        return this.db.user.findMany({ omit: { password: true } });
    }

    async findOne(id: number): Promise<UserResponse> {
        const user = await this.db.user.findUnique({ where: { id }, omit: { password: true } });
        if (!user) this.notFound();
        return user;
    }

    async findOneByEmail(email: string): Promise<User> {
        return this.db.user.findUnique({ where: { email } });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponse> {
        const user = await this.db.user.update({
            where: { id },
            data: updateUserDto,
        });
        if (!user) this.notFound();
        return user;
    }

    async remove(id: number): Promise<UserResponse> {
        return this.db.user.delete({ where: { id } });
    }
}
