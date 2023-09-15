import { Dispatch } from 'react';

import { PostModel } from '../../models/post';
import { getDetailPost } from '../../shared/services/post';
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

export const fetchDetailBlog =
  (id: number): RootThunk =>
  (dispatch: Dispatch<RootAction>) => {
    dispatch(getDetailBlogStart());
    getDetailPost(id)
      .then((result) => {
        dispatch(getDetailBlogSuccess(result as PostModel));
      })
      .catch((err) => {
        dispatch(getDetailBlogFailure(`${err}`));
      });
  };
