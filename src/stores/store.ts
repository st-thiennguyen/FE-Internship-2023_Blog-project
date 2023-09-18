import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction } from 'redux-thunk';

import { detailReducer } from '../app/pages/detail/detail.reducer';
import loginReducer from '../app/redux/reducer/login';
import { postReducer } from '../app/redux/reducer/post';
import registerReducer from '../app/redux/reducer/register';
import { userReducer } from '../app/redux/reducer/user';
import { loggerMiddleware } from './middleware';

export type RootState = ReturnType<typeof rootReducer>;

export type RootAction = AnyAction;

export type RootThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, RootAction>;

export const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  detail: detailReducer,
  post: postReducer,
  user: userReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(loggerMiddleware, thunk)));

export default store;
