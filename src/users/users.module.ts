import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersService } from '../users/users.service';
import { BoothEntity } from 'src/booth/entities/booth.entity';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserEntity, BoothEntity])],
  providers: [UsersService],
  exports: [TypeOrmModule]
})
export class UsersModule {}
