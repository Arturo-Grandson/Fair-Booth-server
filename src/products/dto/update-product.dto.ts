import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductoDto {
  @ApiProperty({ required: false })
  name: string = null as unknown as string;
  
  @ApiProperty({ required: false })
  type: string = null as unknown as string;
  
  @ApiProperty({ required: false })
  price: number = null as unknown as number;

}
