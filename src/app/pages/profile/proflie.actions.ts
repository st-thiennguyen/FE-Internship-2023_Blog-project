import { Dispatch } from 'react';
import ACTIONS_TYPE from '../../shared/constants/type';
import { RootAction } from '../../stores/store';
import { updateProfile } from '../../shared/services/user.service';
import { Auth, UserInfo } from '../../models/auth';
import { UserModel } from '../../models/user';
import { getEmptyImageUrl, putImageToLink } from '../../shared/services/image.service';
import { StorageKey, TypeUploadImage } from '../../shared/constants';
import { getLocalStorage, setLocalStorage } from '../../shared/utils';
import { reAssignmentAuth } from '../auth/auth.actions';

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

export const uploadAvatar =
  (file: File, data: Omit<UserInfo, 'id' | 'email'>) => async (dispatch: Dispatch<RootAction>) => {
    dispatch(updateAvatarStart());
    try {
      const response: any = await getEmptyImageUrl(file, TypeUploadImage.AVATAR);
      await putImageToLink(response.signedRequest, file);
      dispatch(updateAvatarSuccess(response.url));
      dispatch(updateProfileAction(data, response.url) as any);
    } catch (error) {
      dispatch(updateAvatarFailure(`${error}`));
    }
  };

export const updateProfileAction =
  (data: Omit<UserInfo, 'id' | 'email'>, picture?: string) => async (dispatch: Dispatch<RootAction>) => {
    dispatch(updateProfileStart());
    try {
      if (picture) {
        data.picture = picture;
      }
      const response = await updateProfile(data);
      dispatch(updateProfileSuccess(response as UserModel));
      const userData: Auth = getLocalStorage(StorageKey.AUTH);
      const userUpdated = response as UserModel;

      for (const key in userUpdated) {
        if (userData.userInfo.hasOwnProperty(key)) {
          userData.userInfo[key] = userUpdated[key];
        }
      }
      dispatch(reAssignmentAuth(userData));

      setLocalStorage(StorageKey.AUTH, { ...userData });
    } catch (error) {
      dispatch(updateProfileFailure(`${error}`));
    }
  };
