import { RootAction } from '../store';
import * as ACTIONS_TYPE from '../type';

export interface RegisterState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initState: RegisterState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const registerReducer = (state = initState, action: RootAction): RegisterState => {
  switch (action.type) {
    case ACTIONS_TYPE.REGISTER_START: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        message: '',
      };
    }

    case ACTIONS_TYPE.REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        message: action.payload,
      };
    }

    case ACTIONS_TYPE.REGISTER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };
    }
    default:
      return state;
  }
};

export default registerReducer;
