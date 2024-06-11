import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { ComsuptionsEntity } from './entities/comsuptions.entity';
import { Repository } from 'typeorm';
import { AddComsuptionDto } from './dto/add-comsuption.dto';
import { UserEntity } from 'src/auth/entities/user.entity';
import { BoothEntity } from 'src/booth/entities/booth.entity';
import { ProductsEntity } from 'src/products/entities/products.entity';
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
    comsuptionEntity.celebrationType = comsuption.celebrationType
    
    comsuptionEntity.user = Promise.resolve(await this.userRepo.findOne({where: {id: comsuption.user}}))
    comsuptionEntity.booth = Promise.resolve(await this.boothRepo.findOne({where: {id: comsuption.booth}}))
    comsuptionEntity.product = Promise.resolve(await this.productRepo.findOne({where: {id: comsuption.product}}))

    await this.comsuptionsRepo.save(comsuptionEntity)
    return {
      comsuption: { 
        uuid: comsuptionEntity.uuid,
        year: comsuptionEntity.year,
        celebrationType: comsuptionEntity.celebrationType
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
    return this.comsuptionsRepo.find({select: ['year', 'uuid', 'celebrationType']})
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
  @Get(':userUuid/:boothUuid/:year/:celebrationType')
  @ApiResponse({
    description: 'filter comsuption by userUuid, boothUuid and year',
    type: ComsuptionsEntity
  })
  async getAllComsuptionsByUserYearAndBooth (
    @Param('userUuid') userUuid: string, 
    @Param('boothUuid') boothUuid: string,
    @Param('year') year: number,
    @Param('celebrationType') celebrationType: string
  ){
    const user = await this.userRepo.findOne( {where: { uuid: userUuid }} )
    const booth = await this.boothRepo.findOne( {where: { uuid: boothUuid }} )

    const comsuptions = await this.comsuptionsRepo.find({
      where: {
        user: {id: user.id},
        booth: {id: booth.id},
        year: year,
        celebrationType: celebrationType
      }
    })

    const comsuptionsMapped = comsuptions.map(async (c) => {
      const products = await c.product
      return {
        name: products.name,
        price: products.price
      }
    })

    const allUserComsuption =  Promise.all(comsuptionsMapped)
    // TODO: devolver la candidad del producto consumido, el precio por unidad y el precio total
    const result = (await allUserComsuption).reduce((acc, curr) => {
      if(!acc[curr.name]) {
        acc[curr.name] = {name: curr.name, count: 0, total: 0}
      }

      acc[curr.name].count += 1;
      acc[curr.name].total += parseFloat(curr.price.toString())
      return acc
    }, {})

    const formattedResult = Object.values(result)

    return formattedResult
  }
}
