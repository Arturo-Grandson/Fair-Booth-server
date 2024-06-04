import { ApiProperty } from '@nestjs/swagger';

export class AddUserDto {
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
