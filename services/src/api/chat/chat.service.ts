import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseResult } from 'src/domain/dtos/base.result';
import { Pagging } from 'src/domain/dtos/pagging';
import {
  Chat,
  ChatDocument,
  Shop,
  ShopDocument,
  User,
  UserDocument,
} from 'src/domain/schemas';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Shop.name)
    private readonly shopModel: Model<ShopDocument>,
    @InjectModel(Chat.name)
    private readonly chatModel: Model<ChatDocument>,
  ) {}

  async sendMsg(
    from: string,
    to: string,
    content: string,
    isShop: boolean = true,
  ) {
    const fromModel = isShop
      ? this.shopModel.findById.bind(this.shopModel)
      : this.userModel.findById.bind(this.userModel);
    const toModel = isShop
      ? this.userModel.findById.bind(this.userModel)
      : this.shopModel.findById.bind(this.shopModel);

    const fromDoc = await fromModel(from);
    const toDoc = await toModel(to);

    if (!fromDoc || !toDoc) {
      throw new NotFoundException('user or shop not found');
    }

    const chat = Object.assign(
      new Chat(),
      isShop
        ? {
            fromShop: fromDoc,
            to: toDoc,
            content,
          }
        : {
            from: fromDoc,
            toShop: toDoc,
            content,
          },
    );

    return await this.chatModel.create(chat);
  }

  async sendFromShop(shopId: string, to: string, content: string) {
    return await this.sendMsg(shopId, to, content);
  }

  async sendFromUser(userId: string, to: string, content: string) {
    return await this.sendMsg(userId, to, content, false);
  }

  async listChats(id: string, limit = 20, page = 1) {
    const result = new BaseResult<Pagging<Chat>>();

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const isShop = user.adminOfShop != null;
    const objectId = isShop ? user.adminOfShop : user._id;

    const match = isShop
      ? [{ fromShop: objectId }, { toShop: objectId }]
      : [{ from: objectId }, { to: objectId }];

    const pipeline = [
      { $match: { $or: match } },
      { $sort: { createdAt: -1 } },
      {
        $addFields: {
          conv: {
            $ifNull: [
              {
                $concat: [
                  { $toString: '$from' },
                  '-',
                  { $toString: '$toShop' },
                ],
              },
              {
                $concat: [
                  { $toString: '$to' },
                  '-',
                  { $toString: '$fromShop' },
                ],
              },
            ],
          },
        },
      },
      { $group: { _id: '$conv', chat: { $first: '$$ROOT' } } },
      { $replaceRoot: { newRoot: '$chat' } },
      { $sort: { createdAt: -1 } },
    ] as any;

    limit = Math.abs(limit);
    page = Math.abs(page);
    page == 0 && ++page;
    const skip = limit * Math.floor(page - 1);

    const data = (
      await this.chatModel.aggregate(pipeline).facet({
        items: [{ $skip: skip }, { $limit: limit }],
        count: [{ $count: 'count' }],
      })
    )?.[0];

    const items = data?.items;
    const totalItems = data?.count?.[0]?.count;
    const lastPage = Math.ceil(totalItems / limit);

    await this.chatModel.populate(items, [
      'from',
      'fromShop',
      'to',
      'toShop',
    ] as any);

    result.data = Object.assign(new Pagging(), {
      totalItems,
      currentPage: Math.floor(page),
      lastPage,
      hasNext: page < lastPage,
      hasPrev: page > 1,
      items,
    });

    return result;
  }

  async getMessages(userId: string, to: string, limit = 20, page = 1) {
    const result = new BaseResult<Pagging<Chat>>();

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const isShop = user.adminOfShop != null;
    const toId = new Types.ObjectId(to);

    const filter = {
      $or: isShop
        ? [
            { fromShop: user.adminOfShop, to: toId },
            { from: toId, toShop: user.adminOfShop },
          ]
        : [
            { from: user._id, toShop: toId },
            { fromShop: toId, to: user._id },
          ],
    };

    limit = Math.abs(limit);
    page = Math.abs(page);
    page == 0 && ++page;
    const skip = limit * Math.floor(page - 1);

    const totalItems = await this.chatModel.find(filter).countDocuments();
    const lastPage = Math.ceil(totalItems / limit);

    const items: any[] = await this.chatModel
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate(['from', 'fromShop', 'to', 'toShop']);

    result.data = Object.assign(new Pagging(), {
      totalItems,
      currentPage: Math.floor(page),
      lastPage,
      hasNext: page < lastPage,
      hasPrev: page > 1,
      items,
    });

    return result;
  }
}
