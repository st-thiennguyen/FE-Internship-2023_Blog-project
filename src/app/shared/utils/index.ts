import { StorageKey } from '../constants';

export const getLocalStorage = <T>(key: StorageKey, initial?: T): T => {
  return JSON.parse(localStorage.getItem(key)!) || initial;
};

export const setLocalStorage = <T>(key: StorageKey, items: T) => {
  localStorage.setItem(key, JSON.stringify(items));
};

export const convertDateToString = (date: any) => {
  const newDate = new Date(date);
  return newDate.getDate() + '-' + newDate.getMonth() + '-' + newDate.getFullYear();
};

export function isImageUrlValid(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
