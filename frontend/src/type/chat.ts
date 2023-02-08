import { Shop } from './shop';
import { User } from './user';

export type Chat = {
  id: string;
  content: string;
  from: User;
  fromShop: Shop;
  to: User;
  toShop: Shop;
  createdAt: string;
  sending?: boolean;
};
