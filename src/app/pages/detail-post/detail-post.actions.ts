import { Dispatch } from 'react';

import { PostModel } from '../../models/post';
import ACTIONS_TYPE from '../../shared/constants/type';
import { getDetailPost, getPostComments } from '../../shared/services/index';
import { RootAction } from '../../stores/store';
import { CommentItemModel } from '../../models/comment';

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

// Get post commennts
const getCommentsStart = () => {
  return {
    type: ACTIONS_TYPE.GET_COMMENTS,
  };
};

const getCommentsSuccess = (data: CommentItemModel) => {
  return {
    type: ACTIONS_TYPE.GET_COMMENTS_SUCCESS,
    payload: data,
  };
};

const getCommentsFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.GET_COMMENTS_FAILURE,
    payload: message,
  };
};

export const fetchComments = (id: string) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getCommentsStart());
  try {
    const response = await getPostComments(id);
    dispatch(getCommentsSuccess(response as CommentItemModel));
  } catch (error) {
    dispatch(getCommentsFailure(`${error}`));
  }
};
