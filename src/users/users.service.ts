import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../../src/database/database.service';
import { ResponseUtil } from '../../src/common/utils/response.util';
import { PaginationDto } from '../../src/common/dto/pagination.dto';
import { ApiResponse } from '../../src/common/types/responses.types';
import { User } from '@prisma/client';
import { I18nService } from 'nestjs-i18n';
import { PaginationUtil } from '../../src/common/utils/pagination.util';

@Injectable()
export class UsersService {
    constructor(
        private readonly db: DatabaseService,
        private readonly i18n: I18nService,
    ) {}

    async create(data: CreateUserDto): Promise<ApiResponse<User>> {
        const user = await this.db.user.create({ data });
        return ResponseUtil.success<User>(user, 201, this.i18n.t('common.resource_created'));
    }

    async findAll(pagination: PaginationDto): Promise<ApiResponse<User[]>> {
        const { data, meta } = await PaginationUtil.paginate<User>(this.db, 'user', pagination);
        return ResponseUtil.success<User[]>(data, 200, this.i18n.t('common.data_success'), meta);
    }

    async findOne(id: number): Promise<ApiResponse<User>> {
        const user = await this.db.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException(this.i18n.t('errors.resource_not_found'));
        }
        return ResponseUtil.success(user, 200, this.i18n.t('common.data_success'));
    }

    async update(id: number, data: UpdateUserDto): Promise<ApiResponse<User>> {
        const user = await this.db.user.update({ where: { id }, data }).catch(() => {
            throw new NotFoundException('User not found');
        });
        return ResponseUtil.success(user, 200, this.i18n.t('common.resource_updated'));
    }

    async remove(id: number): Promise<ApiResponse<null>> {
        await this.db.user.delete({ where: { id } }).catch(() => {
            throw new NotFoundException(this.i18n.t('errors.resource_not_found'));
        });
        return ResponseUtil.success(null, 204, this.i18n.t('common.resource_removed'));
    }
}
