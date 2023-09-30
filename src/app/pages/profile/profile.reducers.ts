import { ACTIONS_TYPE, StorageKey } from '../../shared/constants';
import { RootAction } from '../../stores/store';
import { UserInfo } from '../../models/auth';
import { PostModel } from '../../models/post';
import { ProfileModel, ProfileState } from '../../models/user';
import { getLocalStorage } from '../../shared/utils';

const initialState: ProfileState = {
  data: {} as ProfileModel,
  followers: [] as UserInfo[],
  following: [] as UserInfo[],
  isLoading: false,
  isError: false,
  isSuccess: false,
  isLoadingFollow: false,
  message: '',
  isDeleteSuccess: false,
  isDeleteFailure: false,
};

export const profileReducer = (state = initialState, action: RootAction): ProfileState => {
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
    case ACTIONS_TYPE.REMOVE_POST_ITEM:
      return {
        ...state,
        isError: false,
        isDeleteFailure: false,
        isDeleteSuccess: false,
        message: '',
      };
    case ACTIONS_TYPE.REMOVE_POST_ITEM_SUCCESS:
      const updatedPosts = state.data.posts.filter((post: PostModel) => post.id !== action.payload.id);
      return {
        ...state,
        isDeleteSuccess: true,
        data: { ...state.data, posts: updatedPosts },
        message: action.payload.res,
      };
    case ACTIONS_TYPE.REMOVE_POST_ITEM_FAILURE:
      return {
        ...state,
        isDeleteFailure: true,
        message: action.payload,
      };

    case ACTIONS_TYPE.UPDATE_FOLLOW:
      return {
        ...state,
        isLoadingFollow: true,
        isSuccess: false,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.UPDATE_FOLLOW_SUCCESS:
      // add/remove current user from follower list
      const currentUser: UserInfo = getLocalStorage(StorageKey.USER);
      const newFollower = () => {
        if (action.payload.isFollowed) {
          state.followers.push(currentUser);
          return state.followers;
        } else {
          return state.followers.filter((user) => user.id !== currentUser.id);
        }
      };

      return {
        ...state,
        data: {
          ...state.data,
          isFollowed: action.payload.isFollowed,
          followers: action.payload.isFollowed ? state.data.followers + 1 : state.data.followers - 1,
        },
        followers: newFollower(),
        isLoadingFollow: false,
        isSuccess: true,
        message: '',
      };
    case ACTIONS_TYPE.UPDATE_FOLLOW_FAILURE:
      return {
        ...state,
        isLoadingFollow: false,
        isError: true,
        message: action.payload,
      };

    // get followers
    case ACTIONS_TYPE.GET_FOLLOWER:
      return {
        ...state,
        followers: [] as UserInfo[],
      };
    case ACTIONS_TYPE.GET_FOLLOWER_SUCCESS:
      return {
        ...state,
        followers: action.payload,
      };
    case ACTIONS_TYPE.GET_FOLLOWER_FAILURE:
      return {
        ...state,
        isError: action.payload,
      };

    // get following
    case ACTIONS_TYPE.GET_FOLLOWING:
      return {
        ...state,
        following: [] as UserInfo[],
      };
    case ACTIONS_TYPE.GET_FOLLOWING_SUCCESS:
      return {
        ...state,
        following: action.payload,
      };
    case ACTIONS_TYPE.GET_FOLLOWING_FAILURE:
      return {
        ...state,
        isError: action.payload,
      };
    default:
      return state;
  }
};
