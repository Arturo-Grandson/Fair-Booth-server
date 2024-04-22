import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { ComsuptionsEntity } from './entities/comsuptions.entity';
import { Repository } from 'typeorm';
import { AddComsuptionDto } from './dto/add-comsuption.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { BoothEntity } from 'src/booth/entities/booth.entity';
import { ProductsEntity } from 'src/products/entities/products.entity';
import { FilterComsuptionDto } from './dto/filter-comsuption.dto';
// import { filter } from 'rxjs';

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
    comsuptionEntity.year = comsuption.year;
    
    comsuptionEntity.user = Promise.resolve(await this.userRepo.findOne({where: {id: comsuption.user}}))
    comsuptionEntity.booth = Promise.resolve(await this.boothRepo.findOne({where: {id: comsuption.booth}}))
    comsuptionEntity.product = Promise.resolve(await this.productRepo.findOne({where: {id: comsuption.product}}))

    await this.comsuptionsRepo.save(comsuptionEntity)
    return {
      comsuption: { 
        uuid: comsuptionEntity.uuid,
        year: comsuptionEntity.year
      },
      user: {
        userUuid: (await comsuptionEntity.user).uuid,
        name: (await comsuptionEntity.user).name
      },
      booth: {
        uuid: (await comsuptionEntity.booth).uuid,
        name: (await comsuptionEntity.booth).name
      },
      product: {
        uuid: (await comsuptionEntity.product).uuid,
        name: (await comsuptionEntity.product).name,
        price: (await comsuptionEntity.product).price
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
      // select: ['uuid', 'year']
    })

    // return comsuption;

    // TODO: devolver los datos siguientes -->
    console.log(comsuption)
    return {
      comsuption: {
        user: (await comsuption.user).name,
        year: comsuption.year,
        product: {
          name: (await comsuption.product).name,
          price: (await comsuption.product).price
        },
        boothName: (await comsuption.booth).name
      }
    }
  }
  //TODO: Terminar este filtro
  @Get(':userUuid/:boothUuid/:year')
  @ApiResponse({
    description: 'filter comsuption by userUuid, boothUuid and year',
    type: ComsuptionsEntity
  })
  async getAllComsuptionsByUserYearAndBooth (
    @Param(':userUuid') userUuid: string, 
    @Param(':boothUuid') boothUuid: string,
    @Param(':year') year: number
  ){
    // console.log(userUuid)
    const user = await this.userRepo.find({ where: {uuid: userUuid} })
    const booth = await this.boothRepo.find({where: {uuid: boothUuid}})

    const comsuptions = await this.comsuptionsRepo.find({
      where: {
        booth: {uuid: boothUuid},
        user: {uuid: userUuid},
        year: year
      }
    })
    // console.log(Promise.resolve((await comsuptions[0].product).price))
    // return await Promise.all(comsuptions.map(async (e) => {
    //   return (await e.product).price
    // }))
    // console.log(comsuptions.map(async (comsuption) => (await comsuption.product).price))
    return comsuptions
  }
}
