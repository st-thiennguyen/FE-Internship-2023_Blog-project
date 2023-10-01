import { Dispatch } from 'react';

import { PostModel, QueryPost } from '../../models/post';
import { getPostDraft, getPublicPosts, getRecyclebinPost, restoreRecyclebinPost } from '../../shared/services/index';
import { RootAction } from '../../stores/store';
import { ACTIONS_TYPE, StorageKey } from '../../shared/constants';
import { ToastType } from '../../models/toast';
import { showToast } from '../../shared/components/toast/toast.actions';
import { GetPostResponse } from '../../models/response';
import { getLocalStorage } from '../../shared/utils';

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

export const getDraftPost = () => {
  return {
    type: ACTIONS_TYPE.GET_DRAFT_POST,
  };
};

export const getDraftPostSuccess = (data: PostModel[]) => {
  const userInfo = getLocalStorage(StorageKey.USER);
  const newData = data.map((item) => {
    return { ...item, user: userInfo };
  });
  return {
    type: ACTIONS_TYPE.GET_DRAFT_POST_SUCCESS,
    payload: newData,
  };
};

export const getDraftPostFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.GET_DRAFT_POST_FAILURE,
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

export const getPostsFailure = (message: string) => {
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
    dispatch(getPostsFailure(`${err}`));
    dispatch(showToast(`${err}`, ToastType.ERROR));
  }
};

export const getRecyclebinAction = (page: number, size: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getPosts());
  try {
    const response = await getRecyclebinPost({ page, size });
    dispatch(getPostsSuccess(response as GetPostResponse));
  } catch (err) {
    dispatch(getPostsFailure(`${err}`));
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

export const getDraftPostAction = () => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getDraftPost());
  try {
    const response = await getPostDraft();
    dispatch(getDraftPostSuccess(response as PostModel[]));
  } catch (err) {
    dispatch(getDraftPostFailure(`${err}`));
  }
};
