import axios from 'axios';

import { ENDPOINT } from '../../constants/endpoint';

export const getDetailPost = (id: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${ENDPOINT.post.index}/${id}`)
      .then((result) => {
        resolve(result.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
