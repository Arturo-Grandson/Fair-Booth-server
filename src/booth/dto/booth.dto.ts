import { ApiProperty } from '@nestjs/swagger';
import { BoothEntity } from '../entities/booth.entity';
import { UserEntity } from 'src/auth/entities/user.entity';
import { ComsuptionsEntity } from 'src/comsuptions/entities/comsuptions.entity';

export type TBoothDto = Omit<BoothEntity, 'id'>;

export class BoothDto {
  constructor(data?: Partial<BoothDto>) {
    if (data) Object.assign(this, data);
  }

  @ApiProperty({ required: false })
  uuid: string = null as unknown as string;

  @ApiProperty({ required: false })
  name: string = null as unknown as string;

  @ApiProperty({ required: false })
  users: UserEntity[] = [] as UserEntity[];

  @ApiProperty({ required: false })
  comsuptions: ComsuptionsEntity[] = [] as ComsuptionsEntity[];

  static fromEntity(entity: BoothEntity): BoothDto {
    const dto = new BoothDto();
    dto.name = entity.name;
    dto.uuid = entity.uuid;
    return dto;
  }
}
