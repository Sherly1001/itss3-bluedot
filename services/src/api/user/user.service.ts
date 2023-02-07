import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { BaseResult } from 'src/domain/dtos/base.result';
import { Shop, ShopDocument, User, UserDocument } from 'src/domain/schemas';
import { LoginUserDto, UpdateUserDto, UserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Shop.name)
    private readonly shopModel: Model<ShopDocument>,
  ) {}

  async getUser(id: string) {
    const result = new BaseResult<User>();
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    result.data = user;
    return result;
  }

  async createUser(body: UserDto) {
    const result = new BaseResult<User>();

    const payload = Object.assign(new User(), body);

    try {
      payload.hashPassword = await bcrypt.hash(
        payload.password,
        await bcrypt.genSalt(),
      );
      delete payload.password;
    } catch (err) {
      throw new InternalServerErrorException({ cause: err });
    }

    try {
      result.data = await this.userModel.create(payload);
    } catch (err) {
      if (err.toString().includes('email_1 dup key')) {
        throw new UnprocessableEntityException('email existed');
      }
    }

    return result;
  }

  async updateUser(id: string, body: UpdateUserDto) {
    const result = new BaseResult<User>();

    const payload = Object.assign(new User(), body);

    try {
      if (payload.password) {
        payload.hashPassword = await bcrypt.hash(
          payload.password,
          await bcrypt.genSalt(),
        );
        delete payload.password;
      }
    } catch (err) {
      throw new InternalServerErrorException(err.toString());
    }

    try {
      delete payload.isAdmin;
      delete payload.adminOfShop;

      result.data = await this.userModel.findOneAndUpdate(
        { _id: id },
        payload,
        {
          new: true,
        },
      );
    } catch (err) {
      if (err.toString().includes('email_1 dup key')) {
        throw new UnprocessableEntityException('email existed');
      }
    }

    return result;
  }

  async deleteUser(id: string) {
    const result = new BaseResult();
    result.data = await this.userModel.findOneAndDelete({ _id: id });
    return result;
  }

  async setAdminToShop(email: string, shopId: string | null) {
    const result = new BaseResult<User>();

    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new NotFoundException('user not found');
      }

      const shop = await this.shopModel.findById(shopId);
      user.adminOfShop = shop;
      await user.save();

      result.data = user;
    } catch (err) {
      throw new InternalServerErrorException(err.toString());
    }

    return result;
  }

  async loginUser(user: LoginUserDto) {
    const result = new BaseResult();
    const res = await this.validateUser(user.email, user.password);
    if (res) {
      result.data = await this.signJwt(res);
    } else {
      throw new UnauthorizedException('email or password not matched');
    }
    return result;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.hashPassword))) {
      return user;
    }
    return null;
  }

  async signJwt(user: UserDocument) {
    return {
      access_token: this.jwtService.sign({ sub: user._id, email: user.email }),
    };
  }

  async validateToken(token: string) {
    const claim = this.jwtService.verify(token);
    const user = await this.userModel.findOne({
      _id: claim.sub,
      email: claim.email,
    });

    return user;
  }
}
