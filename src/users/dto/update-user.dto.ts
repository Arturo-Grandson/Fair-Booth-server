import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export type TUpdateUserDto = Omit<
  UserEntity,
  'id' | 'pass' | 'booths' | 'comsuptions'
>;

export class UpdateUserDto implements TUpdateUserDto {
  @ApiProperty({ required: false })
  uuid: string = null as unknown as string;
  @ApiProperty({ required: false })
  name: string = null as unknown as string;
  @ApiProperty({ required: false })
  email: string = null as unknown as string;
  @ApiProperty({ required: false })
  phone: string = null as unknown as string;
}
