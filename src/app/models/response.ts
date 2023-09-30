import { PostModel } from './post';

export interface GetPostResponse {
  currentPage?: number;
  data: PostModel[];
  itemPerPage?: number;
  loadmore?: boolean;
  totalItems?: number;
  totalPage?: number;
}
