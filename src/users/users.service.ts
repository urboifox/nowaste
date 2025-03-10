import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { ResponseUtil } from 'src/common/utils/response.util';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationUtil } from 'src/common/utils/pagination.util';
import { ApiResponse } from 'src/common/types/responses.types';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private readonly db: DatabaseService) {}

    async create(data: CreateUserDto): Promise<ApiResponse<User>> {
        const user = await this.db.user.create({ data });
        return ResponseUtil.success<User>(user, 201, 'User created');
    }

    async findAll(pagination: PaginationDto): Promise<ApiResponse<User[]>> {
        const { data, meta } = await PaginationUtil.paginate<User>(this.db, 'user', pagination);
        return ResponseUtil.success<User[]>(data, 200, 'Users found', meta);
    }

    async findOne(id: number): Promise<ApiResponse<User>> {
        const user = await this.db.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return ResponseUtil.success(user, 200, 'User found');
    }

    async update(id: number, data: UpdateUserDto): Promise<ApiResponse<User>> {
        const user = await this.db.user.update({ where: { id }, data }).catch(() => {
            throw new NotFoundException('User not found');
        });
        return ResponseUtil.success(user, 200, 'User updated');
    }

    async remove(id: number): Promise<ApiResponse<null>> {
        await this.db.user.delete({ where: { id } }).catch(() => {
            throw new NotFoundException('User not found');
        });
        return ResponseUtil.success(null, 204, 'User removed');
    }
}
