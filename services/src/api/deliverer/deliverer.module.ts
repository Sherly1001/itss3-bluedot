import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Deliverer, DelivererSchema } from 'src/domain/schemas';
import { UserModule } from '../user/user.module';
import { DelivererController } from './deliverer.controller';
import { DelivererService } from './deliverer.service';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Deliverer.name, schema: DelivererSchema },
    ]),
  ],
  controllers: [DelivererController],
  providers: [DelivererService],
})
export class DelivererModule {}
