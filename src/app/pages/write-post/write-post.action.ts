import { Dispatch } from 'react';
import { RootAction } from '../../stores/store';
import { postArticles, updatePostArticles } from '../../shared/services';
import { PostModel, SignatureImageModel, TypeImage } from '../../models/post';
import { ACTIONS_TYPE, TypeUploadImage } from '../../shared/constants';
import { getEmptyImageUrl, putImageToLink } from '../../shared/services/image.service';

export const resetWriteState = () => {
  return {
    type: 'RESET_STATE_WRITEPOST',
  };
};

export const addPostStart = () => {
  return {
    type: ACTIONS_TYPE.ADD_POST,
  };
};

export const addPostSuccess = (data: any) => {
  return {
    type: ACTIONS_TYPE.ADD_POST_SUCCESS,
    payload: data,
  };
};

export const addPostFailure = (error: any) => {
  return {
    type: ACTIONS_TYPE.ADD_POST_FAILURE,
    payload: error,
  };
};

export const updatePostStart = () => {
  return {
    type: ACTIONS_TYPE.UPDATE_POST,
  };
};

export const updatePostSuccess = (data: any) => {
  return {
    type: ACTIONS_TYPE.UPDATE_POST_SUCCESS,
    payload: data,
  };
};

export const updatePostFailure = (error: any) => {
  return {
    type: ACTIONS_TYPE.UPDATE_POST_FAILURE,
    payload: error,
  };
};

export const getUserProfileStart = () => {
  return {
    type: ACTIONS_TYPE.GET_PROFILE,
  };
};

export const createPost = (data: PostModel, file: any) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(addPostStart());
  try {
    const signatureImage: SignatureImageModel = await getEmptyImageUrl(file, TypeUploadImage.COVER_POST) as SignatureImageModel;
    await putImageToLink(signatureImage.signedRequest, file);
    const res = await postArticles({ ...data, cover: signatureImage.url });
    dispatch(addPostSuccess(res));
  } catch (error) {
    dispatch(addPostFailure(error));
  }
};

export const updatePost = (data: PostModel, id: number, file: any) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(updatePostStart());
  try {
    let coverImg = ''
    if (file) {
      const signatureImage: SignatureImageModel = await getEmptyImageUrl(file, TypeUploadImage.COVER_POST) as SignatureImageModel;
      await putImageToLink(signatureImage.signedRequest, file)
      coverImg = signatureImage.url;
    }
    const res = await updatePostArticles({ ...data, cover: coverImg ? coverImg : data.cover }, id);
    dispatch(updatePostSuccess(res));
  } catch (error) {
    dispatch(updatePostFailure(error));
  }
};
