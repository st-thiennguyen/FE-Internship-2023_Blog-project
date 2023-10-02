import { PostModel, PostState } from '../../models/post';
import { ACTIONS_TYPE } from '../../shared/constants';
import { RootAction } from '../../stores/store';

const initState: PostState = {
  data: {} as any,
  isLoading: false,
  isSuccess: false,
  message: '',
  isError: false,
};

export const writePostReducer = (state = initState, action: RootAction) => {
  switch (action.type) {
    case ACTIONS_TYPE.RESET_STATE_WRITEPOST:
      return initState;
    case ACTIONS_TYPE.ADD_POST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };

    case ACTIONS_TYPE.ADD_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        message: 'Create post success !',
        isSuccess: true,
      };

    case ACTIONS_TYPE.ADD_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: 'Create post fail !',
        isSuccess: false,
      };
    case ACTIONS_TYPE.UPDATE_POST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };

    case ACTIONS_TYPE.UPDATE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        message: 'Update post success !',
        isSuccess: true,
      };

    case ACTIONS_TYPE.UPDATE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
        isSuccess: false,
        isError: true,
      };
    case ACTIONS_TYPE.ADD_DRAFT:
      return {
        ...state,
        data: {} as PostModel,
        isLoading: true,
        isSuccess: false,
        isError: false,
      };

    case ACTIONS_TYPE.ADD_DRAFT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case ACTIONS_TYPE.ADD_DRAFT_FAILURE:
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
