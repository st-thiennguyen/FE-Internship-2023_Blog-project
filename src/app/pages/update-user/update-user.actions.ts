import { Dispatch } from 'react';
import ACTIONS_TYPE from '../../shared/constants/type';
import { RootAction } from '../../stores/store';
import { updateProfile } from '../../shared/services/user.service';
import { UserInfo } from '../../models/auth';
import { UserModel } from '../../models/user';
import { getEmptyImageUrl, putImageToLink } from '../../shared/services/image.service';
import { TypeUploadImage } from '../../shared/constants';

const updateAvatarStart = () => {
  return {
    type: ACTIONS_TYPE.UPDATE_AVATAR,
  };
};

const updateAvatarSuccess = (data: string) => {
  return {
    type: ACTIONS_TYPE.UPDATE_AVATAR_SUCCESS,
    payload: data,
  };
};

const updateAvatarFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.UPDATE_AVATAR_FAILURE,
    payload: message,
  };
};

const updateProfileStart = () => {
  return {
    type: ACTIONS_TYPE.UPDATE_PROFILE,
  };
};

const updateProfileSuccess = (data: UserModel) => {
  return {
    type: ACTIONS_TYPE.UPDATE_PROFILE_SUCCESS,
    payload: data,
  };
};

const updateProfileFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.UPDATE_PROFILE_FAILURE,
    payload: message,
  };
};

export const uploadAvatar = (file: File) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(updateAvatarStart());
  try {
    const response: any = await getEmptyImageUrl(file, TypeUploadImage.AVATAR);
    await putImageToLink(response.signedRequest, file);
    dispatch(updateAvatarSuccess(response.signedRequest));
  } catch (error) {
    dispatch(updateAvatarFailure(`${error}`));
  }
};

export const updateProfileAction =
  (
    id: number,
    data: Omit<UserModel, 'id' | 'email' | 'isActive' | 'isAdmin' | 'followers' | 'followings' | 'verifyAt'>,
  ) =>
  async (dispatch: Dispatch<RootAction>) => {
    dispatch(updateProfileStart());
    try {
      const response = await updateProfile(id, data);
      dispatch(updateProfileSuccess(response as UserModel));
    } catch (error) {
      dispatch(updateProfileFailure(`${error}`));
    }
  };
