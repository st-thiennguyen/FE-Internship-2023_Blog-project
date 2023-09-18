import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction } from 'redux-thunk';

import authReducer from '../app/pages/auth/auth.reducer';
import { detailReducer } from '../app/pages/detail/detail.reducer';
import { postReducer } from '../app/redux/reducer/post';
import { userReducer } from '../app/redux/reducer/user';
import { loggerMiddleware } from './middleware';

export type RootState = ReturnType<typeof rootReducer>;

export type RootAction = AnyAction;

export type RootThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, RootAction>;

export const rootReducer = combineReducers({
  auth: authReducer,
  detail: detailReducer,
  post: postReducer,
  user: userReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(loggerMiddleware, thunk)));

export default store;
