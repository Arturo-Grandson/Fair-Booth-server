import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductoDto {
  @ApiProperty({ required: false })
  price: number = null as unknown as number;
}
