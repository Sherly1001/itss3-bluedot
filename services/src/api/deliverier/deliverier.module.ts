import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Deliverier, DeliverierSchema } from 'src/domain/schemas';
import { UserModule } from '../user/user.module';
import { DeliverierController } from './deliverier.controller';
import { DeliverierService } from './deliverier.service';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Deliverier.name, schema: DeliverierSchema },
    ]),
  ],
  controllers: [DeliverierController],
  providers: [DeliverierService],
})
export class DeliverierModule {}
