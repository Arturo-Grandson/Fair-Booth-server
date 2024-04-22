import { ApiProperty } from "@nestjs/swagger";

export class FilterComsuptionDto {
  @ApiProperty({required: false})
  userId: number = null as unknown as number;

  @ApiProperty({required: false})
  boothId: number = null as unknown as number;

  @ApiProperty({required: false})
  year: number = null as unknown as number;
}