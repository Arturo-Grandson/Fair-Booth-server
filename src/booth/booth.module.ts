import { Module } from '@nestjs/common';
import { BoothController } from './booth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoothEntity } from './entities/booth.entity';

@Module({
  controllers: [BoothController],
  imports: [TypeOrmModule.forFeature([BoothEntity])],
  providers: [],
  exports: [TypeOrmModule],
})
export class BoothModule {}
