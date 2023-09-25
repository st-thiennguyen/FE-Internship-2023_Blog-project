import { InteractionItemModel } from './interaction';
import { UserModel } from './user';

export interface PostModel {
  id: number;
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

export interface SignatureImage {
  data: SignatureImageModel;
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
}

export interface PublicPostState {
  data: PostModel[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  currentPage: number;
  totalPage: number;
  totalItems: number;
}

export interface RecommendPostState {
  data: PostModel[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  currentPage: number;
  totalPage: number;
  totalItems: number;
}

export interface DetailStateProps {
  data: PostModel;
  comments: InteractionItemModel[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
