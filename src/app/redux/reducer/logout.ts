import * as ACTIONS_TYPE from '../type';

export interface LogoutProps {
  isLogout: boolean
}

const initState: LogoutProps = {
  isLogout: false
}

export const logoutReducer = (state = initState, action : any) => {
  switch (action.type) {
    case ACTIONS_TYPE.LOGOUT_START: 
      return {
        ...state,
        isLogout: false
      }

      case ACTIONS_TYPE.LOGOUT_SUCCESS: 
      return {
        ...state,
        isLogout: true
      }

      case ACTIONS_TYPE.LOGOUT_FAILURE: 
      return {
        ...state,
        isLogout: false
      }
    
    default:
      return state;
  }
}



