import { Dispatch } from 'react';

import { RootAction } from '../../stores/store';
import { UserInfo } from '../../models/auth';
import { BookmarkModel, PostModel } from '../../models/post';
import { ACTIONS_TYPE } from '../../shared/constants';
import { InteractionItemModel, InteractionProps } from '../../models/interaction';
import { ToastType } from '../../models/toast';

import { showToast } from '../../shared/components/toast/toast.actions';
import { getBookmark, toggleBookmark } from '../../shared/services/user.service';
import { getDetailPost, getPostComments, getUserLike, postComment, updateLike } from '../../shared/services/index';

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
    dispatch(showToast(`${error}`, ToastType.ERROR));
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

// Get post comments
const getCommentsStart = () => {
  return {
    type: ACTIONS_TYPE.GET_COMMENTS,
  };
};

const getCommentsSuccess = (data: InteractionItemModel[]) => {
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
    dispatch(getCommentsSuccess(response as InteractionItemModel[]));
  } catch (error) {
    dispatch(getCommentsFailure(`${error}`));
    dispatch(showToast(`${error}`, ToastType.ERROR));
  }
};

// Post comment
const postCommentStart = () => {
  return {
    type: ACTIONS_TYPE.POST_COMMENT,
  };
};

const postCommentSuccess = (data: InteractionItemModel, user: UserInfo) => {
  return {
    type: ACTIONS_TYPE.POST_COMMENT_SUCCESS,
    payload: { ...data, user: user },
  };
};

const postCommentFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.POST_COMMENT_FAILURE,
    payload: message,
  };
};

export const postCommentAction =
  (id: string, comment: string, user: UserInfo) => async (dispatch: Dispatch<RootAction>) => {
    dispatch(postCommentStart());
    try {
      const response = await postComment(id, comment);
      dispatch(postCommentSuccess(response as InteractionItemModel, user));
    } catch (error) {
      dispatch(postCommentFailure(`${error}`));
    }
  };

//Bookmark
const getBookmarkStart = () => {
  return {
    type: ACTIONS_TYPE.GET_BOOKMARK,
  };
};

const getBookmarkSuccess = (data: BookmarkModel[]) => {
  return {
    type: ACTIONS_TYPE.GET_BOOKMARK_SUCCESS,
    payload: data,
  };
};

const getBookmarkFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.GET_BOOKMARK_FAILURE,
    payload: error,
  };
};

export const fetchBookmark = () => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getBookmarkStart());
  try {
    const response = await getBookmark();
    dispatch(getBookmarkSuccess(response as BookmarkModel[]));
  } catch (error) {
    dispatch(getBookmarkFailure(`${error}`));
  }
};

// Toggle Bookmark
const toggleBookmarkStart = () => {
  return {
    type: ACTIONS_TYPE.TOGGLE_BOOKMARK,
  };
};

const toggleBookmarkSuccess = (res: any) => {
  return {
    type: ACTIONS_TYPE.TOGGLE_BOOKMARK_SUCCESS,
    payload: res,
  };
};

const toggleBookmarkFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.TOGGLE_BOOKMARK_FAILURE,
    payload: error,
  };
};

// Update Bookmark
const updateBookmarkStart = () => {
  return {
    type: ACTIONS_TYPE.UPDATE_BOOKMARK,
  };
};

const updateBookmarkSuccess = (id: number) => {
  return {
    type: ACTIONS_TYPE.UPDATE_BOOKMARK_SUCCESS,
    payload: id,
  };
};

const updateBookmarkFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.UPDATE_BOOKMARK_FAILURE,
    payload: error,
  };
};

export const updateBookmark = (id: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(updateBookmarkStart());
  try {
    await toggleBookmark(id);
    dispatch(updateBookmarkSuccess(id));
  } catch (error) {
    dispatch(updateBookmarkFailure(`${error}`));
  }
};

export const toggleBookmarkAction = (id: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(toggleBookmarkStart());
  try {
    const response = await toggleBookmark(id);
    dispatch(toggleBookmarkSuccess(response as any));
  } catch (error) {
    dispatch(toggleBookmarkFailure(`${error}`));
  }
};

// get like list
const getLikesStart = () => {
  return {
    type: ACTIONS_TYPE.GET_LIKES,
  };
};

const getLikesSuccess = (data: InteractionItemModel[]) => {
  return {
    type: ACTIONS_TYPE.GET_LIKES_SUCCESS,
    payload: data,
  };
};

const getLikesFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.GET_LIKES_FAILURE,
    payload: error,
  };
};

export const fetchLikes = (id: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getLikesStart());
  try {
    const response = await getUserLike(id);
    dispatch(getLikesSuccess(response as InteractionItemModel[]));
  } catch (error) {
    dispatch(getLikesFailure(`${error}`));
  }
};
