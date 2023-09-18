import { Dispatch } from 'react';

import { RootAction } from '../../../stores/store';
import { PostModel } from '../../models/post';
import ACTIONS_TYPE from '../../shared/constants/type';
import { getDetailPost, getPublicPosts } from '../../shared/services/index';

export const getDetailBlogStart = () => {
  return {
    type: ACTIONS_TYPE.GET_DETAIL_BLOG,
  };
};

export const getDetailBlogSuccess = (data: PostModel) => {
  return {
    type: ACTIONS_TYPE.GET_DETAIL_BLOG_SUCCESS,
    payload: data,
  };
};

export const getDetailBlogFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.GET_DETAIL_BLOG_FAILURE,
    payload: message,
  };
};

export const fetchDetailBlog = (id: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getDetailBlogStart());
  try {
    const response = await getDetailPost(id);
    dispatch(getDetailBlogSuccess(response as PostModel));
  } catch (error) {
    dispatch(getDetailBlogFailure(`${error}`));
  }
};

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
