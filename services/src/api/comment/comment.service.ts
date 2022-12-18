import {
  Injectable,
  NotAcceptableException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseResult } from 'src/domain/dtos/base.result';
import {
  Comment,
  CommentDocument,
  Shop,
  ShopDocument,
} from 'src/domain/schemas';
import { UpdateComment } from './dtos';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    @InjectModel(Shop.name)
    private readonly shopModel: Model<ShopDocument>,
  ) {}

  async getAll(itemId: string, targetId: string) {
    const result = new BaseResult<Comment[]>();
    const filter: FilterQuery<CommentDocument> = {};

    try {
      if (await this.shopModel.findOne({ _id: targetId })) {
        filter.item = itemId;
        filter.shop = targetId;
      } else {
        filter.deliverer = targetId;
      }

      result.data = await this.commentModel
        .find(filter)
        .populate(['user', 'shop', 'deliverer']);
    } catch (err) {
      throw new UnprocessableEntityException(err.toString());
    }

    return result;
  }

  async create(userId: string, payload: Comment) {
    const result = new BaseResult<Comment>();

    if (!payload.shop && !payload.deliverer) {
      throw new NotAcceptableException('Missing targetId (shop or deliverer)');
    }

    try {
      payload.user = userId;
      result.data = await this.commentModel.create(payload);
    } catch (err) {
      throw new UnprocessableEntityException(err.toString());
    }

    return result;
  }

  async update(userId: string, id: string, payload: UpdateComment) {
    const result = new BaseResult<Comment>();

    const session = await this.commentModel.startSession();
    session.startTransaction();
    try {
      // update content and rate only
      delete payload.item;
      delete payload.shop;
      delete payload.deliverer;

      result.data = await (
        await this.commentModel.findOneAndUpdate({ _id: id }, payload, {
          session,
          new: true,
        })
      ).populate('user');

      const user: any = result.data.user;
      if (!user || user._id != userId) {
        throw new NotAcceptableException('Not your own comment');
      }

      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      throw new UnprocessableEntityException(err.toString());
    } finally {
      await session.endSession();
    }

    return result;
  }

  async delete(userId: string, id: string) {
    const result = new BaseResult<Comment>();

    const session = await this.commentModel.startSession();
    session.startTransaction();
    try {
      result.data = await (
        await this.commentModel.findOneAndDelete({ _id: id })
      ).populate('user');

      const user: any = result.data.user;
      if (!user || user._id != userId) {
        throw new NotAcceptableException('Not your own comment');
      }

      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      throw new UnprocessableEntityException(err.toString());
    } finally {
      await session.endSession();
    }

    return result;
  }

  async getRating(itemId: string, targetId: string) {
    const filter: FilterQuery<CommentDocument> = {};

    try {
      if (await this.shopModel.findOne({ _id: targetId })) {
        filter.item = itemId;
        filter.shop = targetId;
      } else {
        filter.deliverer = targetId;
      }

      const cmts = await this.commentModel.find(filter);
      return cmts.length > 0
        ? cmts.reduce((acc, c) => acc + c.rate, 0) / cmts.length
        : 5;
    } catch {
      return 5;
    }
  }
}
