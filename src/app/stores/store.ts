import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction } from 'redux-thunk';

import authReducer from '../pages/auth/auth.reducer';
import { detailPostReducer } from '../pages/detail-post/detail-post.reducer';
import { lastesPostReducer, userReducer } from '../pages/home/home.reducer';
import { loggerMiddleware } from './middleware';
import { postTagReducer } from '../pages/posts/posts.reducer';

export type RootState = ReturnType<typeof rootReducer>;

export type RootAction = AnyAction;

export type RootThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, RootAction>;

export const rootReducer = combineReducers({
  auth: authReducer,
  detail: detailPostReducer,
  post: lastesPostReducer,
  user: userReducer,
  postTag: postTagReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(loggerMiddleware, thunk)));

export default store;
