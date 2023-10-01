import { PostModel, PublicPostState, RecommendPostState } from '../../models/post';
import { UserModel, UserState } from '../../models/user';
import { ACTIONS_TYPE } from '../../shared/constants';
import { RootAction } from '../../stores/store';

const initialLastesPostState: PublicPostState = {
  data: [] as PostModel[],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  currentPage: 1,
  totalPage: 0,
  totalItems: 0,
};

export const lastesPostReducer = (state = initialLastesPostState, action: RootAction): PublicPostState => {
  switch (action.type) {
    case ACTIONS_TYPE.GET_ALL_POST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.GET_ALL_POST_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        totalPage: action.payload.totalPage,
        totalItems: action.payload.totalItems,
        isLoading: false,
        isSuccess: true,
        message: '',
      };
    case ACTIONS_TYPE.GET_ALL_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };
    case ACTIONS_TYPE.LOAD_MORE_PUBLIC_POST:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case ACTIONS_TYPE.RESET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: 1,
      };
    default:
      return state;
  }
};

const initialState: UserState = {
  data: [] as UserModel[],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const userReducer = (state = initialState, action: RootAction): UserState => {
  switch (action.type) {
    case ACTIONS_TYPE.GET_USERS:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.GET_USERS_SUCCESS:
      return {
        ...state,
        data: [...action.payload.users],
        isLoading: false,
        isSuccess: true,
        message: '',
      };
    case ACTIONS_TYPE.GET_USERS_FAILURE:
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

const initialRecommendPostState: RecommendPostState = {
  data: [] as PostModel[],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  currentPage: 1,
  totalPage: 0,
  totalItems: 0,
};

export const recommendPostReducer = (state = initialRecommendPostState, action: RootAction): RecommendPostState => {
  switch (action.type) {
    case ACTIONS_TYPE.GET_RECOMMEND:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.GET_RECOMMEND_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        totalPage: action.payload.totalPage,
        totalItems: action.payload.totalItems,
        isLoading: false,
        isSuccess: true,
      };
    case ACTIONS_TYPE.GET_RECOMMEND_FAILURE:
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
