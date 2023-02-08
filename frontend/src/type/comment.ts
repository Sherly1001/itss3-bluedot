import { User } from './user';

export type Comment = {
  id: string;
  content: string;
  rate: number;
  user: User;
};
