import * as ACTIONS_TYPE from '../type';

export interface LoginState {
  token: Boolean,
  isLoading: Boolean,
  error: string
}

const initState: LoginState = {
  token: false,
  isLoading: false,
  error: ''
}

export const loginReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ACTIONS_TYPE.LOGIN_START: {
      return {
        ...state, 
        token: false,
        isLoading: true,
        error: ''
      }
    }
  
    case ACTIONS_TYPE.LOGIN_SUCCESS: {
      return {
        ...state, 
        token: true,
        isLoading: false,
        error: ''
      }
    }

    case ACTIONS_TYPE.LOGIN_FAILURE: {
      return {
        ...state, 
        token: false,
        isLoading: false,
        error: 'fail.........'
      }
    }    

    default: 
      return state
  }
}

export default loginReducer;