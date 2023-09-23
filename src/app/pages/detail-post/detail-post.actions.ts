import { Dispatch } from 'react';

import ACTIONS_TYPE from '../../shared/constants/type';
import { RootAction } from '../../stores/store';
import { PostModel } from '../../models/post';
import { InteractionProps } from '../../models/interaction';

import { getDetailPost, updateLike } from '../../shared/services/index';

const getDetailBlogStart = () => {
  return {
    type: ACTIONS_TYPE.GET_DETAIL_BLOG,
  };
};

const getDetailBlogSuccess = (data: PostModel) => {
  return {
    type: ACTIONS_TYPE.GET_DETAIL_BLOG_SUCCESS,
    payload: data,
  };
};

const getDetailBlogFailure = (message: string) => {
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

// Update like
const updateLikeStart = () => {
  return {
    type: ACTIONS_TYPE.UPDATE_LIKE,
  };
};

const updateLikeSuccess = (response: InteractionProps) => {
  return {
    type: ACTIONS_TYPE.UPDATE_LIKE_SUCCESS,
    payload: response.liked,
  };
};

const updateLikeFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.UPDATE_LIKE_FAILURE,
    payload: error,
  };
};

export const updateLikeAction = (id: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(updateLikeStart());
  try {
    const response = await updateLike(id);
    dispatch(updateLikeSuccess(response as InteractionProps));
  } catch (error) {
    dispatch(updateLikeFailure(`${error}`));
  }
};
