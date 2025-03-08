import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateProductDto implements Prisma.ProductCreateInput {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    name: string;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    price: number;
}

