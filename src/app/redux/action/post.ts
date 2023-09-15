import { Dispatch } from 'react';

import { PostModel } from '../../models/post';
import { getDetailPost, getPublicPosts } from '../../shared/services/post';
import { RootAction, RootThunk } from '../store';
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
  await getDetailPost(id)
    .then((result: any) => {
      dispatch(getDetailBlogSuccess(result));
    })
    .catch((err) => {
      dispatch(getDetailBlogFailure(`${err}`));
    });
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

export const fetchPublicPosts = (page: number, size: number) => async (dispatch: any) => {
  dispatch(getPublicPostStart());
  await getPublicPosts(page, size)
    .then((result: any) => {
      dispatch(getPublicPostSuccess(result));
    })
    .catch((err) => {
      dispatch(getPublicPostFailure(`${err}`));
    });
};
