import { Dispatch } from 'react';

import { RootAction } from '../../stores/store';
import { ToastType } from '../../models/toast';
import { PostModel, PostProps, SignatureImageModel } from '../../models/post';
import { ACTIONS_TYPE, TypeUploadImage } from '../../shared/constants';

import { createDraft, postArticles, updatePostArticles } from '../../shared/services';
import { getEmptyImageUrl, putImageToLink } from '../../shared/services/image.service';
import { showToast } from '../../shared/components/toast/toast.actions';

export const resetWriteState = () => {
  return {
    type: 'RESET_STATE_WRITEPOST',
  };
};

const addPostStart = () => {
  return {
    type: ACTIONS_TYPE.ADD_POST,
  };
};

const addPostSuccess = (data: any) => {
  return {
    type: ACTIONS_TYPE.ADD_POST_SUCCESS,
    payload: data,
  };
};

const addPostFailure = (error: any) => {
  return {
    type: ACTIONS_TYPE.ADD_POST_FAILURE,
    payload: error,
  };
};

const updatePostStart = () => {
  return {
    type: ACTIONS_TYPE.UPDATE_POST,
  };
};

const updatePostSuccess = (data: any) => {
  return {
    type: ACTIONS_TYPE.UPDATE_POST_SUCCESS,
    payload: data,
  };
};

const updatePostFailure = (error: any) => {
  return {
    type: ACTIONS_TYPE.UPDATE_POST_FAILURE,
    payload: error,
  };
};

const createDraftStart = () => {
  return {
    type: ACTIONS_TYPE.ADD_DRAFT,
  };
};

const createDraftSuccess = (post: PostProps) => {
  return {
    type: ACTIONS_TYPE.ADD_DRAFT_SUCCESS,
    payload: post,
  };
};

const createDraftFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.ADD_DRAFT_FAILURE,
    payload: error,
  };
};

export const createPost = (data: PostModel, file: any) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(addPostStart());
  try {
    const signatureImage: SignatureImageModel = (await getEmptyImageUrl(
      file,
      TypeUploadImage.COVER_POST,
    )) as SignatureImageModel;
    await putImageToLink(signatureImage.signedRequest, file);
    const res = await postArticles({ ...data, cover: signatureImage.url });
    dispatch(addPostSuccess(res));
    dispatch(showToast('Create post success', ToastType.SUCCESS));
  } catch (error) {
    dispatch(addPostFailure(error));
    dispatch(showToast(`${error}`, ToastType.ERROR));
  }
};

export const updatePost = (data: PostModel, id: number, file: any) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(updatePostStart());
  try {
    let coverImg = '';
    if (file) {
      const signatureImage: SignatureImageModel = (await getEmptyImageUrl(
        file,
        TypeUploadImage.COVER_POST,
      )) as SignatureImageModel;
      await putImageToLink(signatureImage.signedRequest, file);
      coverImg = signatureImage.url;
    }
    const res = await updatePostArticles({ ...data, cover: coverImg ? coverImg : data.cover }, id);
    dispatch(updatePostSuccess(res));
    dispatch(showToast('Update post success', ToastType.SUCCESS));
  } catch (error) {
    dispatch(updatePostFailure(error));
    dispatch(showToast(`${error}`, ToastType.ERROR));
  }
};

export const saveToDraft = (data: PostProps, file?: File) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(createDraftStart());
  try {
    let signatureImageUrl = '';
    if (file) {
      const signatureImage: SignatureImageModel = (await getEmptyImageUrl(
        file,
        TypeUploadImage.COVER_POST,
      )) as SignatureImageModel;
      await putImageToLink(signatureImage.signedRequest, file);
      signatureImageUrl = signatureImage.url;
    }
    const res = await createDraft({ ...data, cover: signatureImageUrl || '' });
    dispatch(createDraftSuccess(res as PostProps));
    dispatch(showToast('Create draft successfully', ToastType.SUCCESS));
  } catch (error) {
    dispatch(createDraftFailure(`${error}`));
    dispatch(showToast(`${error}`, ToastType.ERROR));
  }
};
