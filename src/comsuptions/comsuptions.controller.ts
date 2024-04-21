import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { ComsuptionsEntity } from './entities/comsuptions.entity';
import { Repository } from 'typeorm';
import { AddComsuptionDto } from './dto/add-comsuption.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { BoothEntity } from 'src/booth/entities/booth.entity';
import { ProductsEntity } from 'src/products/entities/products.entity';

@ApiTags('Comsuptions')
@Controller('comsuptions')
export class ComsuptionsController {
  constructor(
    @InjectRepository(ComsuptionsEntity)
    private comsuptionsRepo: Repository<ComsuptionsEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectRepository(BoothEntity)
    private boothRepo: Repository<BoothEntity>,
    @InjectRepository(ProductsEntity)
    private productRepo: Repository<ProductsEntity>
  ){}

  @Post('/comsuptions')
  @ApiResponse({
    description: 'Add a new comsuption',
    type: AddComsuptionDto
  })
  async addComsuption(@Body() comsuption: AddComsuptionDto){
    let comsuptionEntity = new ComsuptionsEntity()
    comsuptionEntity.year = comsuption.year
    
    comsuptionEntity.user = await this.userRepo.findOne({where: {id: comsuption.user}})
    comsuptionEntity.booth = await this.boothRepo.findOne({where: {id: comsuption.booth}})
    comsuptionEntity.product = await this.productRepo.findOne({where: {id: comsuption.product}})
  
    await this.comsuptionsRepo.save(comsuptionEntity)
    return {
      comsuption: { 
        uuid: comsuptionEntity.uuid,
        year: comsuptionEntity.year
      },
      user: {
        userUuid: comsuptionEntity.user.uuid,
        name: comsuptionEntity.user.name
      },
      booth: {
        uuid: comsuptionEntity.booth.uuid,
        name: comsuptionEntity.booth.name
      },
      product: {
        uuid: comsuptionEntity.product.uuid,
        name: comsuptionEntity.product.name,
        price: comsuptionEntity.product.price
      }
    }
  }

  @Get('/comsuptions')
  @ApiResponse({
    description: 'Get all comsuptions',
    type: ComsuptionsEntity
  })
  async getAllComsuptions(){
    return this.comsuptionsRepo.find({select: ['year', 'uuid']})
  }

  @Get(':uuid')
  @ApiResponse({
    description: 'Get comsuption by uuid',
    type: ComsuptionsEntity
  })
  async findOneBy(@Param('uuid') uuid: string){
    const comsuption = await this.comsuptionsRepo.findOne({
      where: {uuid: uuid}, 
      select: ['uuid', 'year']
    })

    return comsuption;

    //TODO: devolver los datos siguientes -->
    // return {
    //   comsuption: {
    //     user: comsuption.user.name,
    //     year: comsuption.year,
    //     product: {
    //       name: comsuption.product.name,
    //       price: comsuption.product.price
    //     },
    //     boothName: comsuption.booth.name
    //   }
    // }
  }
}
