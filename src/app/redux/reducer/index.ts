import { combineReducers } from 'redux';

import { detailReducer } from './detail.reducer';
<<<<<<< HEAD
import { postReducer } from './post';
=======
import loginReducer from './login';
import registerReducer from './register';
>>>>>>> 9fb72230d2e1b3254b7fff9b77e089730fe4957e

export const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  detail: detailReducer,
  post: postReducer,
});
