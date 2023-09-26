import { UserModel } from './user';

export interface PostModel {
  id: string;
  title: string;
  description: string;
  content: string;
  status: string;
  tags: string[];
  userId: number;
  likes: number;
  comments: number;
  cover: string;
  recommend: boolean;
  deletedAt: any;
  createdAt: string;
  user: UserModel;
  [key: string]: any;
}

export interface SignatureImageModel {
  signedRequest: string;
  url: string;
}

export interface BookmarkModel {
  id: string;
  userId: string;
  postId: string;
}
