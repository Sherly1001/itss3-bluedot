import { ApiProperty } from '@nestjs/swagger';

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
