import { Auth } from '../../models/auth';
import { StorageKey } from '../../shared/constants';
import { getLocalStorage } from '../../shared/utils';
import * as ACTIONS_TYPE from '../type';

export interface LoginState {
  auth: Auth;
  isLoading: boolean;
  isError: boolean;
  message: string;
}

const initState: LoginState = {
  auth: getLocalStorage(StorageKey.AUTH) || null,
  isLoading: false,
  isError: false,
  message: '',
};

export const loginReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ACTIONS_TYPE.LOGIN_START: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: '',
      };
    }

    case ACTIONS_TYPE.LOGIN_SUCCESS: {
      return {
        ...state,
        auth: action.payload,
        isLoading: false,
        message: '',
      };
    }

    case ACTIONS_TYPE.LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };
    }

    case ACTIONS_TYPE.LOGOUT_START: {
      return {
        ...state,
      };
    }

    case ACTIONS_TYPE.LOGOUT_SUCCESS: {
      localStorage.clear();
      return {
        ...initState
      };
    }


    default:
      return state;
  }
};

export default loginReducer;
