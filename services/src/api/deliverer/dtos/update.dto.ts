import { PartialType } from '@nestjs/swagger';
import { Deliverer } from 'src/domain/schemas';

export class UpdateDeliveryDto extends PartialType(Deliverer) {}
