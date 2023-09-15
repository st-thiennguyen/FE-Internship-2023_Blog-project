import moment from 'moment';

import { StorageKey } from '../constants';

export const getLocalStorage = <T>(key: StorageKey, initial?: T): T => {
  return JSON.parse(localStorage.getItem(key)!) || initial;
};

export const setLocalStorage = <T>(key: StorageKey, items: T) => {
  localStorage.setItem(key, JSON.stringify(items));
};

export const convertDateTime = (value: string) => {
  if (value) {
    if (value == '2001-01-01T00:00:00Z' || value == '0001-01-01T00:00:00Z') {
      return null;
    } else {
      return moment(value).utcOffset(7).format('DD-MM-YYYY HH:mm:ss');
    }
  }
  return '';
};

export function isImageUrlValid(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
