import { PostModel } from '../../models/post';
import { RootAction } from '../store';
import * as TYPE from '../type';

interface DetailStateProps {
  data: PostModel[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  currentPage: number;
}
const initialState: DetailStateProps = {
  data: [] as PostModel[],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  currentPage: 1,
};

export const postReducer = (state = initialState, action: RootAction): DetailStateProps => {
  switch (action.type) {
    case TYPE.GET_ALL_POST_START:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: '',
      };
    case TYPE.GET_ALL_POST_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
        isLoading: false,
        isError: false,
        isSuccess: true,
        message: '',
      };
    case TYPE.GET_ALL_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.payload,
      };
    case TYPE.LOAD_MORE_PUBLIC_POST:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    default:
      return state;
  }
};
