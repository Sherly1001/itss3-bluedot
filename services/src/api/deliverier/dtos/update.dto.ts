import { PartialType } from '@nestjs/swagger';
import { Deliverier } from 'src/domain/schemas';

export class UpdateDeliveryDto extends PartialType(Deliverier) {}
