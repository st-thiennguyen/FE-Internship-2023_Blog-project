import { Dispatch } from 'react';

import { PostModel, QueryPost } from '../../models/post';
import { getPublicPosts, getRecyclebinPost, restoreRecyclebinPost } from '../../shared/services/index';
import { RootAction } from '../../stores/store';
import { ACTIONS_TYPE } from '../../shared/constants';

export const getPostsRecyclebin = (page: number) => {
  return {
    type: ACTIONS_TYPE.GET_RECYCLEBIN,
    payload: page,
  };
};

export const getPostsRecyclebinSuccess = (data: PostModel[]) => {
  return {
    type: ACTIONS_TYPE.GET_RECYCLEBIN_SUCCESS,
    payload: data,
  };
};

export const getPostsRecyclebinFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.GET_RECYCLEBIN_FAILURE,
    payload: message,
  };
};

export const restorePost = () => {
  return {
    type: ACTIONS_TYPE.RESTORE_RECYCLEBIN,
  };
};

export const restorePostSuccess = (message: string, idPost: number) => {
  return {
    type: ACTIONS_TYPE.RESTORE_RECYCLEBIN_SUCCESS,
    payload: {
      message: message,
      id: idPost,
    },
  };
};

export const restorePostFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.RESTORE_RECYCLEBIN_FAILURE,
    payload: message,
  };
};

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
    const response = await getRecyclebinPost({ page, size });
    dispatch(getPostsSuccess(response as PostModel[]));
  } catch (err) {
    dispatch(getPostFailure(`${err}`));
  }
};

export const getRecyclebinAction = (query: QueryPost) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getPostsRecyclebin(query.page || 1));
  try {
    const response = await getRecyclebinPost(query);
    dispatch(getPostsRecyclebinSuccess(response as PostModel[]));
  } catch (err) {
    dispatch(getPostsRecyclebinFailure(`${err}`));
  }
};

export const restorePostAction = (idPost: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(restorePost());
  try {
    const response = await restoreRecyclebinPost(idPost);
    dispatch(restorePostSuccess(`${response}`, idPost));
  } catch (err) {
    dispatch(restorePostFailure(`${err}`));
  }
};
