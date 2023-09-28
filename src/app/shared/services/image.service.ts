import { TypeImage } from '../../models/post';
import { ENDPOINT, TypeUploadImage } from '../constants';
import { ApiService } from './config';

export const getEmptyImageUrl = (file: File, type: TypeUploadImage) => {
  const api = new ApiService();
  const params = {
    type_upload: type,
    file_name: file.name,
    file_type: file.type,
  };
  return api.get(`${ENDPOINT.signatures.index}`, params);
};

export const putImageToLink = (url: string, file: File) => {
  const api = new ApiService();
  return api.put(url, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
};


