import { DatabaseService } from 'src/database/database.service';
import { PaginationDto } from '../dto/pagination.dto';
import { Meta } from '../types/responses.types';

export class PaginationUtil {
    static async paginate<T>(
        database: DatabaseService,
        model: keyof DatabaseService,
        pagination: PaginationDto,
    ): Promise<{ data: T[]; meta: Meta }> {
        const { page = 1, limit = 10 } = pagination;
        const skip = (page - 1) * limit;

        const data = (await database[model as keyof typeof DatabaseService].findMany({
            skip,
            take: limit,
        })) as T[];
        const total = await database[model as keyof typeof DatabaseService].count();

        const meta: Meta = { page, limit, total };
        return { data, meta };
    }
}
