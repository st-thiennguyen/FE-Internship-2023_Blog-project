import { Dispatch } from 'react';

import { PostModel, UserModel } from '../../models/post';
import ACTIONS_TYPE from '../../shared/constants/type';
import { getDetailPost, getPublicPosts } from '../../shared/services/index';
import { getUsers } from '../../shared/services/user';
import { RootAction } from '../../stores/store';

export const getPublicPostStart = () => {
  return {
    type: ACTIONS_TYPE.GET_ALL_POST,
  };
};

export const getPublicPostSuccess = (data: PostModel[]) => {
  return {
    type: ACTIONS_TYPE.GET_ALL_POST_SUCCESS,
    payload: data,
  };
};

export const getPublicPostFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.GET_ALL_POST_FAILURE,
    payload: message,
  };
};

export const resetCurrentPage = () => {
  return {
    type: ACTIONS_TYPE.RESET_CURRENT_PAGE,
  };
};

export const loadMore = () => {
  return {
    type: ACTIONS_TYPE.LOAD_MORE_PUBLIC_POST,
  };
};

export const fetchPublicPosts = (page: number, size: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getPublicPostStart());
  try {
    const response = await getPublicPosts(page, size);

    dispatch(getPublicPostSuccess(response as PostModel[]));
  } catch (err) {
    dispatch(getPublicPostFailure(`${err}`));
  }
};

// user
export const getUsersStart = () => {
  return {
    type: ACTIONS_TYPE.GET_USERS,
  };
};

export const getUsersSuccess = (data: UserModel[]) => {
  return {
    type: ACTIONS_TYPE.GET_USERS_SUCCESS,
    payload: data,
  };
};

export const getUsersFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.GET_USERS_FAILURE,
    payload: message,
  };
};

export const fetchUsers = () => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getUsersStart());
  try {
    const response = await getUsers();

    dispatch(getUsersSuccess(response as UserModel[]));
  } catch (err) {
    dispatch(getUsersFailure(`${err}`));
  }
};
