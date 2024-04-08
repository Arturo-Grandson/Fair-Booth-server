import { Module } from '@nestjs/common';
import { BoothController } from './booth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoothEntity } from './entities/booth.entity';
import { BoothService } from './booth.service';

@Module({
  controllers: [BoothController],
  imports: [TypeOrmModule.forFeature([BoothEntity])],
  providers: [BoothService],
  exports: [TypeOrmModule],
})
export class BoothModule {}
