import { combineReducers } from 'redux';
import loginReducer from './login';
import { detailReducer } from './detail.reducer';

export const rootReducer = combineReducers({
  login: loginReducer,
  detail: detailReducer,
});
