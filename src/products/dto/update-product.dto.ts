import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class UpdateProductDto implements Prisma.ProductCreateInput {
    @ApiProperty({ description: 'Product name' })
    @IsString()
    @MinLength(3)
    @IsOptional()
    name: string;

    @ApiProperty({ description: 'Product price' })
    @IsNumber()
    @Min(0)
    @IsOptional()
    price: number;
}
