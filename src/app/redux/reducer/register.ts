import { RootAction } from '../store';
import * as ACTIONS_TYPE from '../type';

export interface RegisterState {
  isLoading: boolean;
  message: string;
  error: string;
}

const initState: RegisterState = {
  isLoading: false,
  message: '',
  error: '',
};

export const registerReducer = (state = initState, action: RootAction) => {
  switch (action.type) {
    case ACTIONS_TYPE.REGISTER_START: {
      return {
        ...state,
        isLoading: true,
        message: '',
        error: '',
      };
    }

    case ACTIONS_TYPE.REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        message: action.payload,
      };
    }

    case ACTIONS_TYPE.REGISTER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default registerReducer;
