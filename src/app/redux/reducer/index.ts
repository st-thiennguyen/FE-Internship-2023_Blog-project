import { logoutReducer } from './logout';
import { combineReducers } from 'redux';

import { detailReducer } from './detail.reducer';
import loginReducer from './login';
import registerReducer from './register';

export const rootReducer = combineReducers({
  logout: logoutReducer,
  login: loginReducer,
  register: registerReducer,
  detail: detailReducer,
});
