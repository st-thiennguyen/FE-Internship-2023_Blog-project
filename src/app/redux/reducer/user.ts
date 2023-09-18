import { RootAction } from '../../../stores/store';
import { UserModel } from '../../models/post';
import ACTIONS_TYPE from '../../shared/constants/type';

interface UserState {
  data: UserModel[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
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
