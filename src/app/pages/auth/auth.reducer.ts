import { Auth } from '../../models/auth';
import { StorageKey, ACTIONS_TYPE } from '../../shared/constants';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../shared/utils';
import { RootAction } from '../../stores/store';

export interface AuthStateProps {
  auth: Auth;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initState: AuthStateProps = {
  auth: getLocalStorage(StorageKey.AUTH) || null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const authReducer = (state = initState, action: RootAction): AuthStateProps => {
  switch (action.type) {
    case ACTIONS_TYPE.REGISTER_RESET_STATE: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
      };
    }
    case ACTIONS_TYPE.REGISTER: {
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

    case ACTIONS_TYPE.LOGIN: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };
    }
    case ACTIONS_TYPE.LOGIN_SUCCESS: {
      setLocalStorage(StorageKey.AUTH, action.payload);
      return {
        ...state,
        auth: action.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        message: '',
      };
    }

    case ACTIONS_TYPE.LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      };
    }

    case ACTIONS_TYPE.REASSIGNMENT_AUTH: {
      setLocalStorage(StorageKey.AUTH, { ...action.payload });
      return {
        ...state,
        auth: action.payload,
      };
    }

    case ACTIONS_TYPE.LOGOUT: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    }

    case ACTIONS_TYPE.LOGOUT_SUCCESS: {
      removeLocalStorage(StorageKey.AUTH);
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: '',
      };
    }

    case ACTIONS_TYPE.LOGOUT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
