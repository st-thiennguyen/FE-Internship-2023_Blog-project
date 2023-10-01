import { UserInfo } from './auth';

export interface InteractionProps {
  liked: boolean;
  content: string;
}

export interface InteractionItemModel {
  id: number;
  userId: number;
  postId: number;
  comment?: string;
  user: UserInfo;
  createdAt: string;
}
