import { Product as PrismaProduct } from '@prisma/client';
export declare class Product implements PrismaProduct {
    id: number;
    name: string;
    isForSale: boolean;
    isSold: boolean;
    isExpired: boolean;
    price: number;
    createdAt: Date;
}
