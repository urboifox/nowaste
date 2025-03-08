import { ApiProperty } from '@nestjs/swagger';
import { Product as PrismaProduct } from '@prisma/client';

export class Product implements PrismaProduct {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    isForSale: boolean;

    @ApiProperty()
    isSold: boolean;

    @ApiProperty()
    isExpired: boolean;

    @ApiProperty()
    price: number;

    @ApiProperty()
    createdAt: Date;
}
