// prisma.d.ts (place this in your project root or a types folder)
import { Prisma } from '@prisma/client';
import { PaginationDto } from 'src/dto/pagination.dto'; // Adjust path
import { Meta } from 'src/types/responses.types'; // Adjust path

// Define the paginate method signature
interface PaginateMethod {
    paginate<T>(pagination: PaginationDto): Promise<{ data: T[]; meta: Meta }>;
}

// Extend all Prisma models to include paginate
declare module '@prisma/client' {
    interface PrismaClient {
        $extends: (extension: any) => PrismaClient & {
            [K in keyof PrismaClient]: PrismaClient[K] & PaginateMethod;
        };
    }

    // Extend specific models (e.g., User)
    export interface UserDelegate {
        paginate: PaginateMethod['paginate'];
    }
}
