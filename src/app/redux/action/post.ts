import { Dispatch } from 'react';

import { PostModel } from '../../models/post';
import { getDetailPost, getPublicPosts } from '../../shared/services/index';
import { RootAction } from '../store';
import * as TYPE from '../type';

export const getDetailBlogStart = () => {
  return {
    type: TYPE.GET_DETAIL_BLOG_START,
  };
};

export const getDetailBlogSuccess = (data: PostModel) => {
  return {
    type: TYPE.GET_DETAIL_BLOG_SUCCESS,
    payload: data,
  };
};

export const getDetailBlogFailure = (message: string) => {
  return {
    type: TYPE.GET_DETAIL_BLOG_FAILURE,
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
    type: TYPE.GET_ALL_POST_START,
  };
};

export const getPublicPostSuccess = (data: PostModel[]) => {
  return {
    type: TYPE.GET_ALL_POST_SUCCESS,
    payload: data,
  };
};

export const getPublicPostFailure = (message: string) => {
  return {
    type: TYPE.GET_ALL_POST_FAILURE,
    payload: message,
  };
};

export const resetCurrentPage = () => {
  return {
    type: TYPE.RESET_CURRENT_PAGE,
  };
};

export const loadMore = () => {
  return {
    type: TYPE.LOAD_MORE_PUBLIC_POST,
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
