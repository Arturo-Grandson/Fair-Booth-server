import { Module } from '@nestjs/common';
import { ComsuptionsController } from './comsuptions.controller';
import { ComsuptionsService } from './comsuptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComsuptionsEntity } from './entities/comsuptions.entity';
import { ProductsEntity } from 'src/products/entities/products.entity';
import { BoothEntity } from 'src/booth/entities/booth.entity';
import { UserEntity } from 'src/auth/entities/user.entity';
import { BoothController } from 'src/booth/booth.controller';
import { UsersController } from 'src/auth/users.controller';
import { ProductsController } from 'src/products/products.controller';
import { UsersModule } from 'src/auth/users.module';
import { BoothModule } from 'src/booth/booth.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [ComsuptionsController],
  providers: [ComsuptionsService],
  imports: [TypeOrmModule.forFeature([
    ComsuptionsEntity, 
    ProductsEntity, 
    BoothEntity, 
    UserEntity
  ]),
    UsersModule,
    BoothModule,
    ProductsModule
  ],
  exports: [TypeOrmModule],
})
export class ComsuptionsModule {}
