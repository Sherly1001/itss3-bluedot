import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseResult } from 'src/domain/dtos/base.result';
import { Category, CategoryDocument } from 'src/domain/schemas/category.schema';
import {
  AddCategoriesDto,
  DeleteCategoriesDto,
  UpdateCategoryDto,
} from './dtos';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async getCategories(search?: string) {
    const result = new BaseResult<Category[]>();
    const filter: FilterQuery<Category> = {};
    if (search) {
      filter.name = { $regex: new RegExp(search, 'i') };
    }
    result.data = await this.categoryModel.find(filter);
    return result;
  }

  async addCategories(payload: AddCategoriesDto) {
    const result = new BaseResult<Category[]>();
    const docs = payload.names.map((name) =>
      Object.assign(new Category(), { name }),
    );
    try {
      const session = await this.categoryModel.startSession();
      result.data = await this.categoryModel.insertMany(docs, {
        session,
      });
      await session.commitTransaction();
    } catch (err) {
      if (err.toString().includes('name_1 dup key')) {
        throw new UnprocessableEntityException('category existed');
      }
    }
    return result;
  }

  async updateCategory(id: string, payload: UpdateCategoryDto) {
    const result = new BaseResult<Category>();
    try {
      result.data = await this.categoryModel.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true },
      );
    } catch (err) {
      if (err.toString().includes('name_1 dup key')) {
        throw new UnprocessableEntityException('category existed');
      }
    }
    return result;
  }

  async deleteCategories(payload: DeleteCategoriesDto) {
    const { ids } = payload;
    const result = new BaseResult();
    try {
      result.data = await this.categoryModel.deleteMany({ _id: { $in: ids } });
    } catch (err) {
      console.log(err);
    }
    return result;
  }
}
