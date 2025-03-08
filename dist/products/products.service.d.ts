import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
export declare class ProductsService {
    private db;
    constructor(db: PrismaService);
    private notFound;
    create(data: CreateProductDto): Promise<Product>;
    findAll(page: number, perPage: number): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    update(id: number, data: UpdateProductDto): Promise<Product>;
    remove(id: number): Promise<Product>;
}
