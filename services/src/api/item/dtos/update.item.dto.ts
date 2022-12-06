import { PartialType } from '@nestjs/swagger';
import { Item } from 'src/domain/schemas';

export class UpdateItemDto extends PartialType(Item) {}
