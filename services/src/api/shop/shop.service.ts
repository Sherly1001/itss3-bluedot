import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseResult } from 'src/domain/dtos/base.result';
import { Item, ItemDocument, Shop, ShopDocument } from 'src/domain/schemas';
import { UpdateShopDto } from './dtos';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Shop.name) private readonly shopModel: Model<ShopDocument>,
    @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
  ) {}

  async getShops(search?: string) {
    const result = new BaseResult<Shop[]>();
    const filter: FilterQuery<ShopDocument> = {};
    if (search) {
      filter.name = { $regex: new RegExp(search, 'i') };
    }
    result.data = await this.shopModel.find(filter);
    return result;
  }

  async addShop(shop: Shop) {
    const result = new BaseResult<Shop>();
    try {
      result.data = await this.shopModel.create(shop);
    } catch (err) {
      if (err.toString().includes('name_1 dup key')) {
        throw new UnprocessableEntityException('shop name existed');
      }
    }
    return result;
  }

  async updateShop(id: string, payload: UpdateShopDto) {
    const result = new BaseResult<Shop>();
    try {
      result.data = await this.shopModel.findOneAndUpdate(
        { _id: id },
        payload,
        {
          new: true,
        },
      );
    } catch (err) {
      if (err.toString().includes('name_1 dup key')) {
        throw new UnprocessableEntityException('shop name existed');
      }
    }
    return result;
  }

  async deleteShop(id: string) {
    const result = new BaseResult<Shop>();

    const session = await this.shopModel.startSession();

    try {
      session.startTransaction();
      result.data = await this.shopModel.findOneAndDelete(
        { _id: id },
        { session },
      );

      await this.itemModel.updateMany(
        { 'prices.shop': id },
        {
          $pull: {
            prices: { shop: id },
          },
        },
        { session },
      );

      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      throw new UnprocessableEntityException(err.toString());
    } finally {
      await session.endSession();
    }
    return result;
  }
}
