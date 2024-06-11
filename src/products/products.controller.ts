import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsEntity } from './entities/products.entity';
import { AddProductoDto } from './dto/add-product.dto';
import { UpdateProductoDto } from './dto/update-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,
  ) {} 

  @Post('/product')
  @ApiResponse({
    description: 'Add a new product',
    type: AddProductoDto,
  })
  async addProduct(@Body() product: AddProductoDto) {
    try {
      await this.productsRepository.save(product);
    } catch (error) {
      return error;
    }
  }

  @Get('/products')
  @ApiResponse({
    description: 'Get all Products',
    type: ProductsEntity,
  })
  async getAllProducts() {
    return this.productsRepository.find({
      select: ['id', 'uuid', 'name', 'type', 'price'],
    });
  }

  @Get(':uuid')
  @ApiResponse({
    description: 'Get product by uuid',
    type: ProductsEntity,
  })
  async getProduct(@Param('uuid') uuid: string): Promise<ProductsEntity> {
    try {
      return this.productsRepository.findOne({
        where: { uuid: uuid },
        select: ['uuid', 'name', 'type', 'price'],
      });
    } catch (error) {
      return error;
    }
  }

  @Patch(':uuid')
  @ApiResponse({
    description: 'update a product',
    type: UpdateProductoDto,
  })
  async UpdateProduct(
    @Param('uuid') uuid: string,
    @Body() updateProduct: UpdateProductoDto,
  ) {
    const product = await this.productsRepository.findOne({
      where: { uuid: uuid },
    });
    if (!product) throw new Error('Product not found');

    product.name = updateProduct.name ?? product.name;
    product.type = updateProduct.type ?? product.type;
    product.price = updateProduct.price ?? product.price;
    
    await this.productsRepository.save(product);

    return {
      uuid: product.uuid,
      name: product.name,
      type: product.type,
      price: product.price,
    };
  }
}
