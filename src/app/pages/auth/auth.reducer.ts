import { AuthState, UserInfo } from '../../models/auth';
import { StorageKey, ACTIONS_TYPE } from '../../shared/constants';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../shared/utils';
import { RootAction } from '../../stores/store';

const initState: AuthState = {
  userInfo: getLocalStorage(StorageKey.USER, {} as UserInfo) || null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  isLogoutSuccess: false,
};

export const authReducer = (state = initState, action: RootAction): AuthState => {
  switch (action.type) {
    case ACTIONS_TYPE.REGISTER_RESET_STATE: {
      return initState;
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
      setLocalStorage(StorageKey.USER, action.payload.userInfo);
      setLocalStorage(StorageKey.ACCESS_TOKEN, action.payload.accessToken);
      return {
        ...state,
        userInfo: action.payload.userInfo,
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
      setLocalStorage(StorageKey.USER, action.payload);
      return {
        ...state,
        userInfo: action.payload,
      };
    }

    case ACTIONS_TYPE.LOGOUT: {
      return {
        ...state,
        isLoading: true,
        isLogoutSuccess: false,
        isError: false,
      };
    }

    case ACTIONS_TYPE.LOGOUT_SUCCESS: {
      removeLocalStorage(StorageKey.USER);
      removeLocalStorage(StorageKey.ACCESS_TOKEN);
      return {
        ...state,
        userInfo: initState.userInfo,
        isLoading: false,
        isError: false,
        isLogoutSuccess: true,
        isSuccess: false,
        message: action.payload,
      };
    }

    case ACTIONS_TYPE.LOGOUT_FAILURE: {
      removeLocalStorage(StorageKey.USER);
      removeLocalStorage(StorageKey.ACCESS_TOKEN);
      return {
        ...state,
        userInfo: initState.userInfo,
        isLoading: false,
        isError: false,
        isLogoutSuccess: true,
        isSuccess: false,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
