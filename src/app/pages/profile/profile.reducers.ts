import { ProfileModel, UserModel } from '../../models/user';
import ACTIONS_TYPE from '../../shared/constants/type';
import { RootAction } from '../../stores/store';

interface UpdateProfileStateProps {
  data: ProfileModel;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
const initialState: UpdateProfileStateProps = {
  data: {} as ProfileModel,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const profileReducer = (state = initialState, action: RootAction): UpdateProfileStateProps => {
  switch (action.type) {
    case ACTIONS_TYPE.GET_PROFILE:
      return {
        ...state,
        data: {} as ProfileModel,
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };

    case ACTIONS_TYPE.GET_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
      };

    case ACTIONS_TYPE.GET_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };

    case ACTIONS_TYPE.GET_USER_POST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };

    case ACTIONS_TYPE.GET_USER_POST_SUCCESS:
      const { Posts, verifyAt } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          verifyAt: verifyAt,
          posts: Posts,
        },
        isLoading: false,
        isSuccess: true,
      };

    case ACTIONS_TYPE.GET_USER_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };

    case ACTIONS_TYPE.UPDATE_PROFILE:
      return {
        ...state,
        data: {} as ProfileModel,
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
        data: {} as ProfileModel,
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
