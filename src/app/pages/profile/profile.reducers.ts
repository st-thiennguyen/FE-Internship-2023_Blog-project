import { PostModel } from '../../models/post';
import { UserModel } from '../../models/user';
import ACTIONS_TYPE from '../../shared/constants/type';
import { RootAction } from '../../stores/store';

interface UpdateProfileStateProps {
  data: UserModel;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
const initialState: UpdateProfileStateProps = {
  data: {} as UserModel,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const profileReducer = (state = initialState, action: RootAction): UpdateProfileStateProps => {
  switch (action.type) {
    case ACTIONS_TYPE.UPDATE_PROFILE:
      return {
        ...state,
        data: {} as UserModel,
        isSuccess: false,
        isLoading: true,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
        message: '',
      };
    case ACTIONS_TYPE.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };
    case ACTIONS_TYPE.UPDATE_AVATAR:
      return {
        ...state,
        data: {} as UserModel,
        isSuccess: false,
        isLoading: true,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.UPDATE_AVATAR_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          picture: action.payload,
        },
        isLoading: false,
        isSuccess: true,
        message: '',
      };
    case ACTIONS_TYPE.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };
    case ACTIONS_TYPE.UPDATE_PASSWORD:
      return {
        ...state,
        isSuccess: false,
        isLoading: true,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        message: 'Update Password Success',
      };
    case ACTIONS_TYPE.UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };
    default:
      return state;
  }
};
