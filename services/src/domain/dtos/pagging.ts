import { ApiProperty } from '@nestjs/swagger';

export class BasePagging {
  @ApiProperty({ required: false, default: 20 })
  limit?: number = 20;

  @ApiProperty({ required: false, default: 1 })
  page?: number = 1;
}

export class Pagging<T> {
  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  lastPage: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  hasNext: boolean;

  @ApiProperty()
  hasPrev: boolean;

  @ApiProperty()
  items: T[];
}
