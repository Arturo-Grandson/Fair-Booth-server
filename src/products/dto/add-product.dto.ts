import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';

export class AddProductoDto {
  // @ApiProperty({required: false})
  // uuid: string = null as unknown as string;

  @ApiProperty({ required: false })
  name: string = null as unknown as string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsIn(['food', 'drink'])
  type: string = null as unknown as string;

  @ApiProperty({ required: false })
  price: number = null as unknown as number;
}
