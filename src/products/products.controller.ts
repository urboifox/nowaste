import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    Query,
    DefaultValuePipe,
    ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @ApiResponse({ status: 201, type: Product })
    create(@Body(ValidationPipe) data: CreateProductDto) {
        return this.productsService.create(data);
    }

    @Get()
    @ApiResponse({ status: 200, type: [Product] })
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('perPage', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
    ) {
        return this.productsService.findAll(page, perPage);
    }

    @Get(':id')
    @ApiResponse({ status: 200, type: Product })
    findOne(@Param('id', ParseIntPipe) id: string) {
        return this.productsService.findOne(+id);
    }

    @Patch(':id')
    @ApiResponse({ status: 200, type: Product })
    update(@Param('id', ParseIntPipe) id: string, @Body(ValidationPipe) data: UpdateProductDto) {
        return this.productsService.update(+id, data);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, type: Product })
    remove(@Param('id', ParseIntPipe) id: string) {
        return this.productsService.remove(+id);
    }
}
