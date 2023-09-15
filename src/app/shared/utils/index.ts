import axios from 'axios';

import { StorageKey } from '../constants';

export const getLocalStorage = <T>(key: StorageKey, initial?: T): T => {
  return JSON.parse(localStorage.getItem(key)!) || initial;
};

export const setLocalStorage = <T>(key: StorageKey, items: T) => {
  localStorage.setItem(key, JSON.stringify(items));
};

export const checkImage = async (url: string) => {
  if (!url) {
    return false;
  }
  const res = await axios.get(url);
  const buff = res.status === 200;

  return buff;
};

export const isImageUrlValid = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};
