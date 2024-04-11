import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../entities/user.entity";


export type TUserDto = Omit<UserEntity, 'id' | 'uuid'  | 'booths' | 'comsuptions' >

export class UserDto implements TUserDto {

  constructor(data?: Partial<UserEntity>){
    if(data) Object.assign(this, data)
  }

  @ApiProperty({required: false})
  uuid: string = null as unknown as string;
  @ApiProperty({required: false})
  name: string = null as unknown as string;
  @ApiProperty({required: false})
  email: string = null as unknown as string;
  @ApiProperty({required: false})
  phone: string = null as unknown as string;
  @ApiProperty({required: false})
  pass: string = null as unknown as string;

  static fromEntity(entity: UserEntity): UserDto {
    const dto = new UserDto()
    dto.name = entity.name;
    dto.email = entity.email;
    dto.phone = entity.phone;
    dto.pass = entity.pass;
    return dto
  }
}