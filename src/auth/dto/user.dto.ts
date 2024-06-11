import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export type TUserDto = Omit<UserEntity, 'booths' | 'comsuptions'>;

export class UserDto implements TUserDto {
  @ApiProperty({ required: false })
  id: number = null as unknown as number
  @ApiProperty({ required: false })
  uuid: string = null as unknown as string;
  @ApiProperty({ required: false })
  name: string = null as unknown as string;
  @ApiProperty({ required: false })
  email: string = null as unknown as string;
  @ApiProperty({ required: false })
  phone: string = null as unknown as string;
  @ApiProperty({ required: false })
  pass: string = null as unknown as string;
  @ApiProperty({ required: false })
  boothUuid: string = null as unknown as string;
}
