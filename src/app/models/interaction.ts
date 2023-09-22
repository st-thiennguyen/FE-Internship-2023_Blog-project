import { UserModel } from './post';

export interface InteractionProps {
  liked: boolean;
  content: string;
}

export interface InteractionItemModel {
  id: number;
  userId: number;
  postId: number;
  comment: string;
  user: UserModel;
  createdAt: string;
}
