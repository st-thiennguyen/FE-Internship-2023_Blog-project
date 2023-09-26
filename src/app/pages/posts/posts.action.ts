import { Dispatch } from 'react';

import { PostModel } from '../../models/post';
import ACTIONS_TYPE from '../../shared/constants/type';
import { QueryPost, getPublicPosts, getSoftDeletedPosts } from '../../shared/services/index';
import { RootAction } from '../../stores/store';

export const getPosts = () => {
  return {
    type: ACTIONS_TYPE.GET_POSTS,
  };
};

export const getPostsSuccess = (data: PostModel[]) => {
  return {
    type: ACTIONS_TYPE.GET_POSTS_SUCCESS,
    payload: data,
  };
};

export const getPostFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.GET_POSTS_FAILURE,
    payload: message,
  };
};

export const resetCurrentPage = () => {
  return {
    type: ACTIONS_TYPE.RESET_CURRENT_PAGE_POST_WITH_TAG,
  };
};

export const loadMore = () => {
  return {
    type: ACTIONS_TYPE.LOAD_MORE_POST_WITH_TAGS,
  };
};

export const fetchPostWithTags = (query: QueryPost) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getPosts());
  try {
    const response = await getPublicPosts(query);
    dispatch(getPostsSuccess(response as PostModel[]));
  } catch (err) {
    dispatch(getPostFailure(`${err}`));
  }
};

export const fetchSoftDeletedPosts = (page: number, size: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getPosts());
  try {
    const response = await getSoftDeletedPosts(page, size);
    dispatch(getPostsSuccess(response as PostModel[]));
  } catch (err) {
    dispatch(getPostFailure(`${err}`));
  }
};
