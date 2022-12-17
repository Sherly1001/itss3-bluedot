import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseResult } from 'src/domain/dtos/base.result';
import { Deliverier, DeliverierDocument } from 'src/domain/schemas';
import { UpdateDeliveryDto } from './dtos';

@Injectable()
export class DeliverierService {
  constructor(
    @InjectModel(Deliverier.name)
    private readonly deliverierModel: Model<DeliverierDocument>,
  ) {}

  async getAll(search: string) {
    const result = new BaseResult<Deliverier[]>();
    const filter: FilterQuery<DeliverierDocument> = {};

    if (search) {
      filter.name = {
        $regex: new RegExp(search, 'i'),
      };
    }

    result.data = await this.deliverierModel.find(filter);

    return result;
  }

  async create(payload: Deliverier) {
    const result = new BaseResult<Deliverier>();

    try {
      result.data = await this.deliverierModel.create(payload);
    } catch (err) {
      if (err.toString().includes('name_1 dup key')) {
        throw new UnprocessableEntityException(err.toString());
      }
    }

    return result;
  }

  async update(id: string, payload: UpdateDeliveryDto) {
    const result = new BaseResult<Deliverier>();

    try {
      result.data = await this.deliverierModel.findOneAndUpdate(
        { _id: id },
        payload,
        {
          new: true,
        },
      );
    } catch (err) {
      if (err.toString().includes('name_1 dup key')) {
        throw new UnprocessableEntityException(err.toString());
      }
    }

    return result;
  }

  async delete(id: string) {
    const result = new BaseResult<Deliverier>();

    try {
      result.data = await this.deliverierModel.findOneAndDelete({ _id: id });
    } catch (err) {
      throw new UnprocessableEntityException(err.toString());
    }

    return result;
  }
}
