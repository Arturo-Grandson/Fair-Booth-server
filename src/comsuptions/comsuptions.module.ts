import { Module } from '@nestjs/common';
import { ComsuptionsController } from './comsuptions.controller';
import { ComsuptionsService } from './comsuptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComsuptionsEntity } from './entities/comsuptions.entity';

@Module({
  controllers: [ComsuptionsController],
  providers: [ComsuptionsService],
  imports: [TypeOrmModule.forFeature([ComsuptionsEntity])],
  exports: [TypeOrmModule],
})
export class ComsuptionsModule {}
