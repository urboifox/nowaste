import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
    constructor(private db: PrismaService) {}

    private notFound() {
        throw new NotFoundException('Product not found');
    }

    create(data: CreateProductDto): Promise<Product> {
        return this.db.product.create({ data });
    }

    findAll(page: number, perPage: number): Promise<Product[]> {
        return this.db.product.findMany({
            take: perPage,
            skip: perPage * (page - 1),
        });
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.db.product.findUnique({ where: { id } });
        if (!product) this.notFound();
        return product;
    }

    async update(id: number, data: UpdateProductDto): Promise<Product> {
        const product = await this.db.product.update({
            where: { id },
            data,
        });
        if (!product) this.notFound();
        return product;
    }

    async remove(id: number): Promise<Product> {
        const product = await this.db.product.delete({ where: { id } });
        if (!product) this.notFound();
        return product;
    }
}
