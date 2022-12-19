import { ApiProperty } from '@nestjs/swagger';

export class GetItemsDto {
  @ApiProperty({ required: false, default: 20 })
  limit?: number = 20;

  @ApiProperty({ required: false, default: 1 })
  page?: number = 1;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  categories?: string[];

  @ApiProperty({ required: false })
  shops?: string[];
}
