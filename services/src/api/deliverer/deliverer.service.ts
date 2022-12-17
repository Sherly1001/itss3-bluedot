import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseResult } from 'src/domain/dtos/base.result';
import { Deliverer, DelivererDocument } from 'src/domain/schemas';
import { CommentService } from '../comment/comment.service';
import { UpdateDeliveryDto } from './dtos';

@Injectable()
export class DelivererService {
  constructor(
    @InjectModel(Deliverer.name)
    private readonly delivererModel: Model<DelivererDocument>,
    private readonly commentService: CommentService,
  ) {}

  async getAll(search: string) {
    const result = new BaseResult<Deliverer[]>();
    const filter: FilterQuery<DelivererDocument> = {};

    if (search) {
      filter.name = {
        $regex: new RegExp(search, 'i'),
      };
    }

    const data = await this.delivererModel.find(filter);
    for (let i = 0; i < data.length; ++i) {
      const rate = await this.commentService.getRating(
        null,
        data[i]?._id?.toString(),
      );

      data[i].rate = rate;
    }

    result.data = data;

    return result;
  }

  async create(payload: Deliverer) {
    const result = new BaseResult<Deliverer>();

    try {
      result.data = await this.delivererModel.create(payload);
    } catch (err) {
      if (err.toString().includes('name_1 dup key')) {
        throw new UnprocessableEntityException(err.toString());
      }
    }

    return result;
  }

  async update(id: string, payload: UpdateDeliveryDto) {
    const result = new BaseResult<Deliverer>();

    try {
      result.data = await this.delivererModel.findOneAndUpdate(
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
    const result = new BaseResult<Deliverer>();

    try {
      result.data = await this.delivererModel.findOneAndDelete({ _id: id });
    } catch (err) {
      throw new UnprocessableEntityException(err.toString());
    }

    return result;
  }
}
