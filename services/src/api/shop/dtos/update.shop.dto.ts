import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Shop } from 'src/domain/schemas';

export class UpdateShopDto extends PartialType(Shop) {}
