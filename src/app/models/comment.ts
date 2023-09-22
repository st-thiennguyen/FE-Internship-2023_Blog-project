import { UserModel } from './user';

export interface CommentItemModel {
  id: number;
  userId: number;
  postId: number;
  comment: string;
  user: UserModel;
  createdAt: string;
}
