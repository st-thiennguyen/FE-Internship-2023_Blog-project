import { ApiService } from './index';
import { ENDPOINT } from '../constants/endpoint';

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

export const getRecommendPosts = (page: number, size: number) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.post.recommend}`, {
    page,
    size,
  });
};

export const updateLike = (id: number) => {
  const api = new ApiService();
  return api.put(`${ENDPOINT.post.index}/${id}/likes`);
};

export const getPostComments = (id: string) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.post.index}/${id}/comments`);
};

export const postComment = (id: string, comment: string) => {
  const api = new ApiService();
  return api.post(`${ENDPOINT.post.index}/${id}/comments`, { content: comment });
};
