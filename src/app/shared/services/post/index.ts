import axios from 'axios';

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
