import { combineReducers } from 'redux';

import { detailReducer } from './detail.reducer';
import loginReducer from './login';
import registerReducer from './register';

export const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  detail: detailReducer,
});
