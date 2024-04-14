import { BadRequestException, Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BoothEntity } from 'src/booth/entities/booth.entity';
import { BoothDto } from 'src/booth/dto/booth.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserDto>,
    @InjectRepository(BoothEntity)
    private boothRepository: Repository<BoothEntity>
  ){}

  //TODO: Mejorar código.
  @Post('/user')
  @ApiResponse({
    description: 'Add a new User',
    type: AddUserDto
  })
  async addUser(@Body() user: AddUserDto): Promise<AddUserDto>{
    console.log(user)
    if (!user.email) throw new BadRequestException('no hay email')
    const userEntity = new UserEntity()
    userEntity.name = user.name
    userEntity.email = user.email
    userEntity.phone = user.phone
    userEntity.pass = user.pass

    const booth = await this.boothRepository.findOne({where: {uuid: user.boothUuid}, select:['uuid', 'name']})
    if(!booth) throw new BadRequestException(`No se encuentra ninguna caseta con uuid: ${user.boothUuid}`)
    userEntity.booths = [booth];
    return await this.userRepository.save(userEntity)
  }

  @Get('/users')
  @ApiResponse({
    description: 'Get all users',
    type: UserDto
  })
  async getAllUsers(): Promise<UserDto[]> {
    return await this.userRepository.find({
      select: ['uuid', 'name', 'email', 'phone']
    })
  }

  @Get('/user/:uuid')
  @ApiResponse({
    description: 'Get a user by uuid',
    type: UserDto
  })
  async getUser(@Param('uuid') uuid: string): Promise<UserDto> {
    return this.userRepository.findOne({
        where: {uuid: uuid}, 
        select: ['uuid', 'name', 'email', 'phone']
      })
  }

  @Patch('/user/:uuid')
  @ApiResponse({
    description: 'Update user',
    type: UpdateUserDto
  })
  async updateUser(@Param('uuid') uuid: string, @Body() updateUser: UpdateUserDto){
    const user = await this.userRepository.findOne({where:{uuid}})
    if(!user) 
      throw new Error('User not found')

    user.name = updateUser.name ?? user.name
    user.email = updateUser.email ?? user.email
    user.phone = updateUser.phone ?? user.phone

    await this.userRepository.save(user)
    return{
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      phone: user.phone
    }
  }
}
