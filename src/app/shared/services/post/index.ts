import axios from 'axios';

import { PostModel } from '../../../models/post';
import { ENDPOINT } from '../../constants/endpoint';

export const getDetailPost = (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${ENDPOINT.post.index}/${id}`);
      const data = res.data;
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const getPublicPosts = (page: number, size: number): Promise<PostModel[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${ENDPOINT.post.public}`, {
        params: {
          page,
          size,
        },
      });
      const data = res.data.data;
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
