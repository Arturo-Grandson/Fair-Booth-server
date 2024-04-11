import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ){}

  @Post('/user')
  @ApiResponse({
    description: 'Add a new User',
    type: AddUserDto
  })
  async addUser(@Body() addUserDto: AddUserDto): Promise<UserDto> {
    // return UserDto.fromEntity(await this.userRepository.save(addUser))
    return await this.userRepository.save(addUserDto)
  }

}
