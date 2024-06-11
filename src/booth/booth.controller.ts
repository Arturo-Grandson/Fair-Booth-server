import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { BoothEntity } from './entities/booth.entity';
import { Repository } from 'typeorm';
import { AddBoothDto } from './dto/add-booth.dto';
import { BoothDto } from './dto/booth.dto';

@ApiTags('Booth')
@Controller('booth')
export class BoothController {
  constructor(
    @InjectRepository(BoothEntity)
    private boothRepository: Repository<BoothEntity>,
  ) {}

  @Post('/:name')
  @ApiResponse({
    description: 'Add a new Booth',
    type: AddBoothDto,
  })
  async addBooth(@Param('name') name: string): Promise<BoothDto> {
    return BoothDto.fromEntity(await this.boothRepository.save({ name }));
  }

  @Get('/booths')
  @ApiResponse({
    description: 'Get all booths',
    type: BoothEntity,
  })
  async getAllBooths(): Promise<BoothEntity[]>{
    return await this.boothRepository.find({})
  }

}
