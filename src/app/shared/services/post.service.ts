import { ENDPOINT } from '../constants/endpoint';
import { ApiService } from './index';

export const getDetailPost = (id: number) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.post.index}/${id}`);
};

export interface QueryPost {
  page?: number;
  size?: number;
  tags?: string[];
}
export const getPublicPosts = (query: QueryPost) => {
  const api = new ApiService();

  Object.keys(query).forEach((key) => {
    if (query[key as keyof typeof query] === undefined) {
      delete query[key as keyof typeof query];
    }
  });
  return api.get(`${ENDPOINT.post.public}`, query);
};
