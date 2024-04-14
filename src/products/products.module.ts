import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from './entities/products.entity';

@Module({
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([ProductsEntity])],
  providers: [ProductsService],
})
export class ProductsModule {}
