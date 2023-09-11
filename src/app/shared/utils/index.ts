import { StorageKey } from '../constants';

export const getLocalStorage = (key: StorageKey) => {
  return JSON.parse(localStorage.getItem(key)!) || [];
};

export const setLocalStorage = (key: StorageKey, items: any) => {
  localStorage.setItem(key, JSON.stringify(items));
};
