import { Dispatch } from 'react';

import { PostModel, QueryPost } from '../../models/post';
import { getPublicPosts, getRecyclebinPost, restoreRecyclebinPost } from '../../shared/services/index';
import { RootAction } from '../../stores/store';
import { ACTIONS_TYPE } from '../../shared/constants';
import { ToastType } from '../../models/toast';
import { showToast } from '../../shared/components/toast/toast.actions';
import { getBookmark, getUserPosts } from '../../shared/services/user.service';
import { GetPostResponse } from '../../models/response';

const restorePost = () => {
  return {
    type: ACTIONS_TYPE.RESTORE_RECYCLEBIN,
  };
};

const restorePostSuccess = (message: string, postId: number) => {
  return {
    type: ACTIONS_TYPE.RESTORE_RECYCLEBIN_SUCCESS,
    payload: {
      message: message,
      id: postId,
    },
  };
};

const restorePostFailure = (message: string) => {
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

export const getPostsSuccess = (data: GetPostResponse) => {
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
    dispatch(getPostsSuccess(response as GetPostResponse));
  } catch (err) {
    dispatch(getPostFailure(`${err}`));
    dispatch(showToast(`${err}`, ToastType.ERROR));
  }
};

export const getRecyclebinAction = (page: number, size: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getPosts());
  try {
    const response = await getRecyclebinPost({ page, size });
    dispatch(getPostsSuccess(response as GetPostResponse));
  } catch (err) {
    dispatch(getPostFailure(`${err}`));
    dispatch(showToast(`${err}`, ToastType.ERROR));
  }
};

export const restorePostAction = (postId: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(restorePost());
  try {
    const response = await restoreRecyclebinPost(postId);
    dispatch(restorePostSuccess(`${response}`, postId));
    dispatch(showToast('Restore post successfully', ToastType.SUCCESS));
  } catch (err) {
    dispatch(restorePostFailure(`${err}`));
    dispatch(showToast(`${err}`, ToastType.ERROR));
  }
};
