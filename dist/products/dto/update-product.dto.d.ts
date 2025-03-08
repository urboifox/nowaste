import { Prisma } from '@prisma/client';
export declare class UpdateProductDto implements Prisma.ProductCreateInput {
    name: string;
    price: number;
}
