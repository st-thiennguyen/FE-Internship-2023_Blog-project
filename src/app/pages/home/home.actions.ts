import { Dispatch } from 'react';

import { PostModel, QueryPost } from '../../models/post';
import { UserModel } from '../../models/user';
import { RootAction } from '../../stores/store';

import { getPublicPosts, getRecommendPosts } from '../../shared/services/index';
import { getUsers } from '../../shared/services/user.service';
import { ACTIONS_TYPE } from '../../shared/constants';
import { showToast } from '../../shared/components/toast/toast.actions';
import { ToastType } from '../../models/toast';

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

export const fetchPublicPosts = (query: QueryPost) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getPublicPostStart());
  try {
    const response = await getPublicPosts(query);
    dispatch(getPublicPostSuccess(response as PostModel[]));
  } catch (err) {
    dispatch(getPublicPostFailure(`${err}`));
    dispatch(showToast(`${err}`, ToastType.ERROR));
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
    dispatch(showToast(`${err}`, ToastType.ERROR));
  }
};

// recommend
export const getRecommendStart = () => {
  return {
    type: ACTIONS_TYPE.GET_RECOMMEND,
  };
};

export const getRecommendSuccess = (data: PostModel[]) => {
  return {
    type: ACTIONS_TYPE.GET_RECOMMEND_SUCCESS,
    payload: data,
  };
};

export const getRecommendFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.GET_RECOMMEND_FAILURE,
    payload: error,
  };
};

export const getRecommend = (page: number, size: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getRecommendStart());
  try {
    const response = await getRecommendPosts(page, size);
    dispatch(getRecommendSuccess(response as PostModel[]));
  } catch (error) {
    dispatch(getRecommendFailure(`${error}`));
    dispatch(showToast(`${error}`, ToastType.ERROR));
  }
};
