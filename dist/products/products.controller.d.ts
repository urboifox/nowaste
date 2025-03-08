import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(data: CreateProductDto): Promise<Product>;
    findAll(page: number, perPage: number): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, data: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<Product>;
}
