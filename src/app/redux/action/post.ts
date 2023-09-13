import { Dispatch } from 'react';

import { PostModel } from '../../models/post-item';
import { getDetailPost } from '../../shared/services/post';
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

export const fetchDetailBlog = async (id: number, dispatch: Dispatch<RootAction>) => {
  dispatch(getDetailBlogStart());
  await getDetailPost(id)
    .then((result: any) => {
      dispatch(getDetailBlogSuccess(result));
    })
    .catch((err) => {
      dispatch(getDetailBlogFailure(`${err}`));
    });
};
