import { ApiService } from './index';
import { ENDPOINT } from '../constants/endpoint';
import { PostProps, QueryPost } from '../../models/post';

export const getDetailPost = (id: number) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.post.index}/${id}`);
};

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

export const postArticles = (data: any) => {
  const api = new ApiService();
  return api.post(`${ENDPOINT.post.index}`, data);
};

export const updatePostArticles = (data: any, id: number) => {
  const api = new ApiService();
  return api.put(`${ENDPOINT.post.index}/${id}`, data);
};

export const getSignUrlImage = (file: any) => {
  const api = new ApiService();
  const params = {
    type_upload: 'cover-post',
    file_name: file.name,
    file_type: file.type,
  };
  return api.get(`${ENDPOINT.signatures.index}`, params);
};

export const UploadUrlImagePost = (url: string, file: any) => {
  const api = new ApiService();
  const formData = new FormData();
  formData.append('file', file);
  return api.put(url, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
};
export const deletePostItem = (id: string) => {
  const api = new ApiService();
  return api.delete(`${ENDPOINT.post.index}/${id}`);
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

export const getRecyclebinPost = (query: QueryPost) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.post.recyclebin}`, query);
};

export const restoreRecyclebinPost = (idPost: number) => {
  const api = new ApiService();
  return api.put(`${ENDPOINT.post.index}/${idPost}/restore`);
};

export const getPostDraft = () => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.post.draft}`);
};

export const createDraft = (data: PostProps) => {
  const api = new ApiService();
  return api.post(ENDPOINT.post.draft, data);
};

export const getUserLike = (id: number) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.post.index}/${id}/likes`);
};
