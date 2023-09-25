import { PostModel } from '../../models/post';
import { ACTIONS_TYPE } from '../../shared/constants';
import { RootAction } from '../../stores/store';

interface PostProps {
  data: PostModel;
  isLoading: Boolean;
  isSuccess: Boolean;
  message: string;
  isError?: Boolean;
}

const initState: PostProps = {
  data: {} as any,
  isLoading: false,
  isSuccess: false,
  message: '',
  isError: false,
};

export const writePostReducer = (state = initState, action: RootAction) => {
  switch (action.type) {
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
        message: 'Update post fail !',
        isSuccess: false,
        isError: true,
      };
    default:
      return state;
  }
};
