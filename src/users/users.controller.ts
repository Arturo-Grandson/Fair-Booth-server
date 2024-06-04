import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BoothEntity } from 'src/booth/entities/booth.entity';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserDto>,
    @InjectRepository(BoothEntity)
    private boothRepository: Repository<BoothEntity>,
  ) {}

  //TODO: Mejorar código.
  @Post('/user')
  @ApiResponse({
    description: 'Add a new User',
    type: AddUserDto,
  })
  async create(@Body() user: AddUserDto) {
    if (!user.email) throw new BadRequestException('no hay email');
    const userEntity = new UserEntity();
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.phone = user.phone;
    userEntity.pass = bcrypt.hashSync(user.pass, 10);

    const booth = await this.boothRepository.findOne({
      where: { uuid: user.boothUuid },
      select: ['uuid', 'name'],
    });
    if (!booth)
      throw new BadRequestException(
        `No se encuentra ninguna caseta con uuid: ${user.boothUuid}`,
      );
    userEntity.booths = [booth];
    await this.userRepository.save(userEntity);
    delete user.pass;

    return 'Usuario creado'

    // TODO: Retornar JWT de acceso

  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {

    const { pass, email } = loginUserDto;

    const user = await this.userRepository.findOne({ 
      where: {email},
      select: {email: true, pass: true}
     })

    if(!user) throw new UnauthorizedException('Credentials are not valid (email)')

    if(!bcrypt.compareSync(pass, user.pass))
      throw new UnauthorizedException('Credentials are not valid (password)')

    return user;

    // TODO: retornar JWT

  }

  @Get('/users')
  @ApiResponse({
    description: 'Get all users',
    type: UserDto,
  })
  async getAllUsers(): Promise<UserDto[]> {
    return await this.userRepository.find({
      select: ['uuid', 'name', 'email', 'phone'],
    });
  }

  @Get('/user/:uuid')
  @ApiResponse({
    description: 'Get a user by uuid',
    type: UserDto,
  })
  async getUser(@Param('uuid') uuid: string): Promise<UserDto> {
    return this.userRepository.findOne({
      where: { uuid: uuid },
      select: ['uuid', 'name', 'email', 'phone'],
    });
  }

  @Patch('/user/:uuid')
  @ApiResponse({
    description: 'Update user',
    type: UpdateUserDto,
  })
  async updateUser(
    @Param('uuid') uuid: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    const user = await this.userRepository.findOne({ where: { uuid } });
    if (!user) throw new Error('User not found');

    user.name = updateUser.name ?? user.name;
    user.email = updateUser.email ?? user.email;
    user.phone = updateUser.phone ?? user.phone;

    await this.userRepository.save(user);
    return {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  }
}
