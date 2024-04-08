import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoothModule } from './booth/booth.module';
import { ComsuptionsModule } from './comsuptions/comsuptions.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { BoothEntity } from './booth/entities/booth.entity';
import { ComsuptionsEntity } from './comsuptions/entities/comsuptions.entity';
import { ProductsEntity } from './products/entities/products.entity';
import { UserEntity } from './users/entities/user.entity';

const ENTITIES = [BoothEntity, ComsuptionsEntity, ProductsEntity, UserEntity]

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [...ENTITIES],
      synchronize: false
    }),
    BoothModule,
    ComsuptionsModule,
    ProductsModule,
    UsersModule
  ],
})
export class AppModule {}
