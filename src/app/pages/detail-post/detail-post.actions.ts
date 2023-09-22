import { Dispatch } from 'react';

import ACTIONS_TYPE from '../../shared/constants/type';
import { RootAction } from '../../stores/store';
import { PostModel } from '../../models/post';
import { InteractionItemModel } from '../../models/comment';

import { getDetailPost, getPostLikes } from '../../shared/services/index';

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

const getPostLikesStart = () => {
  return {
    type: ACTIONS_TYPE.GET_POST_LIKES,
  };
};

const getPostLikesSuccess = (data: InteractionItemModel[]) => {
  return {
    type: ACTIONS_TYPE.GET_POST_LIKES_SUCCESS,
    payload: data,
  };
};

const getPostLikesFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.GET_POST_LIKES_FAILURE,
    payload: error,
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

export const fetchPostLikes = (id: string) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getPostLikesStart());
  try {
    const response = await getPostLikes(id);
    dispatch(getPostLikesSuccess(response as InteractionItemModel[]));
  } catch (error) {
    dispatch(getPostLikesFailure(`${error}`));
  }
};
