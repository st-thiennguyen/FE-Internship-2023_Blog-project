import { combineReducers } from 'redux';

import { detailReducer } from './detail.reducer';
import loginReducer from './login';
import { postReducer } from './post';
import registerReducer from './register';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  detail: detailReducer,
  post: postReducer,
  user: userReducer,
});
