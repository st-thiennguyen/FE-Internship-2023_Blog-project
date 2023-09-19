import { StorageKey } from '../constants';
import { ENDPOINT } from '../constants/endpoint';
import { getLocalStorage } from '../utils';
import { ApiService } from './index';

export const getDetailPost = (id: number) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.post.index}/${id}`);
};

export const getPublicPosts = (page: number, size: number) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.post.public}`, {
    page,
    size,
  });
};

export const deleteMyPost = (id: number) => {
  const token: any = getLocalStorage(StorageKey.AUTH);
  const api = new ApiService(token.accessToken);
  return api.delete(`${ENDPOINT.post.index}/${id}`);
}
