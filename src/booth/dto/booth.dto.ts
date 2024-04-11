import { ApiProperty } from "@nestjs/swagger"
import { BoothEntity } from "../entities/booth.entity"

export type TBoothDto = Omit<BoothEntity, 'id' | 'users' | 'comsuptions'>

export class BoothDto implements TBoothDto{

  constructor(data?: Partial<BoothDto>){
    if(data) Object.assign(this, data)
  }

  @ApiProperty({required: false})
  uuid: string = null as unknown as string

  @ApiProperty({required: false})
  name: string = null as unknown as string

  static fromEntity(entity: BoothEntity): BoothDto {
    const dto = new BoothDto();
    dto.name = entity.name;
    dto.uuid = entity.uuid
    return dto
  }
}