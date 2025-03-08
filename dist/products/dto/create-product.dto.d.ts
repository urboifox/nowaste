import { Prisma } from '@prisma/client';
export declare class CreateProductDto implements Prisma.ProductCreateInput {
    name: string;
    price: number;
}
