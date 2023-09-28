import { PostModel, PublicPostState } from '../../models/post';
import { ACTIONS_TYPE } from '../../shared/constants';
import { RootAction } from '../../stores/store';

const initialPostsState: PublicPostState = {
  data: [] as PostModel[],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  currentPage: 1,
  totalPage: 0,
  totalItems: 0,
};

export const postTagReducer = (state = initialPostsState, action: RootAction): PublicPostState => {
  switch (action.type) {
    case ACTIONS_TYPE.GET_POSTS:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.GET_POSTS_SUCCESS:
      const newPosts = action.payload.currentPage === 1 ? action.payload.data : [...state.data, ...action.payload.data];
      return {
        ...state,
        data: newPosts,
        totalPage: action.payload.totalPage,
        totalItems: action.payload.totalItems,
        isLoading: false,
        isSuccess: true,
        message: '',
      };
    case ACTIONS_TYPE.GET_POSTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };
    case ACTIONS_TYPE.LOAD_MORE_POST_WITH_TAGS:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case ACTIONS_TYPE.RESET_CURRENT_PAGE_POST_WITH_TAG:
      return {
        ...state,
        currentPage: 1,
      };

    case ACTIONS_TYPE.RESTORE_RECYCLEBIN:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };

    case ACTIONS_TYPE.RESTORE_RECYCLEBIN_SUCCESS:
      return {
        ...state,
        data: [...state.data.filter((item) => item.id !== action.payload.id)],
        isLoading: false,
        isSuccess: true,
        message: action.payload.message,
      };

    case ACTIONS_TYPE.RESTORE_RECYCLEBIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };

    case ACTIONS_TYPE.GET_DRAFT_POST:
      return {
        ...state,
        data: [],
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.GET_DRAFT_POST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
        message: '',
      };
    case ACTIONS_TYPE.GET_DRAFT_POST_FAILURE:
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
