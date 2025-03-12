import { DatabaseService } from 'src/database/database.service';
import { PaginationDto } from '../dto/pagination.dto';
import { Meta } from '../types/responses.types';
import { Prisma } from '@prisma/client';

export class PaginationUtil {
    static async paginate<T>(
        database: DatabaseService,
        model: Lowercase<Prisma.ModelName>,
        pagination: PaginationDto,
        args?: any,
    ): Promise<{ data: T[]; meta: Meta }> {
        const { page = 1, limit = 10 } = pagination;
        const skip = (page - 1) * limit;

        const data = (await database[model].findMany({
            skip,
            take: limit,
            ...args,
        })) as T[];
        const total = await database[model].count();

        const meta: Meta = { page, limit, total };
        return { data, meta };
    }
}
