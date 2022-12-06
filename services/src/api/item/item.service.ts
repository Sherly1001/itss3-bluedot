import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseResult } from 'src/domain/dtos/base.result';
import { Item, ItemDocument, Shop, ShopDocument } from 'src/domain/schemas';
import { Category, CategoryDocument } from 'src/domain/schemas/category.schema';
import { GetItemsDto, UpdateItemDto } from './dtos';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name)
    private readonly itemModel: Model<ItemDocument>,
    @InjectModel(Shop.name)
    private readonly shopModel: Model<ShopDocument>,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async getItems(query: GetItemsDto) {
    const result = new BaseResult<Item[]>();
    const filter: FilterQuery<ItemDocument> = {};
    let { name, categories, shops } = query;

    if (typeof categories == 'string') {
      categories = [categories];
    }

    if (typeof shops == 'string') {
      shops = [shops];
    }

    if (name) {
      filter.name = { $regex: new RegExp(name, 'i') };
    }

    if (categories) {
      filter.categories = categories;
    }

    if (shops) {
      filter.prices = {};
    }

    result.data = await this.itemModel
      .find(filter)
      .populate(['categories', 'prices.shop']);

    return result;
  }

  async addItem(payload: Item) {
    const result = new BaseResult<Item>();
    try {
      result.data = await (
        await this.itemModel.create(payload)
      ).populate(['categories', 'prices.shop']);
    } catch (err) {
      if (err.toString().includes('name_1 dup key')) {
        throw new UnprocessableEntityException('item name existed');
      }

      throw new UnprocessableEntityException(err.toString());
    }
    return result;
  }

  async updateItem(id: string, payload: UpdateItemDto) {
    const result = new BaseResult<Item>();
    try {
      result.data = await (
        await this.itemModel.findOneAndUpdate({ _id: id }, payload, {
          new: true,
        })
      ).populate(['categories', 'prices.shop']);
    } catch (err) {
      if (err.toString().includes('name_1 dup key')) {
        throw new UnprocessableEntityException('item name existed');
      }

      throw new UnprocessableEntityException(err.toString());
    }
    return result;
  }

  async deleteItem(id: string) {
    const result = new BaseResult<Item>();
    try {
      result.data = await (
        await this.itemModel.findOneAndDelete({ _id: id })
      ).populate(['categories', 'prices.shop']);
    } catch (err) {
      throw new UnprocessableEntityException(err.toString());
    }
    return result;
  }
}
