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

export interface PostProps {
  title: string;
  cover: string;
  content: string;
  status: string;
  description: string;
  tags?: string[];
}

export interface SignatureImageModel {
  signedRequest: string;
  url: string;
}

export interface SignatureImageState {
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

export interface DetailState {
  data: PostModel;
  comments: InteractionItemModel[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

export interface PostState {
  data: PostModel;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  isError?: boolean;
}

export interface QueryPost {
  page?: number;
  size?: number;
  tags?: string[];
}
