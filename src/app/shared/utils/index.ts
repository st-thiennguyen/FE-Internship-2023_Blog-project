import { StorageKey } from '../constants';

export const getLocalStorage = <T>(key: StorageKey, initial?: T): T => {
  return JSON.parse(localStorage.getItem(key)!) || initial;
};

export const setLocalStorage = <T>(key: StorageKey, items: T) => {
  localStorage.setItem(key, JSON.stringify(items));
};
