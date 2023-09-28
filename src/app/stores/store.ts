import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction } from 'redux-thunk';

import authReducer from '../pages/auth/auth.reducer';
import { bookmarkReducer, detailPostReducer } from '../pages/detail-post/detail-post.reducer';
import { lastesPostReducer, recommendPostReducer, userReducer } from '../pages/home/home.reducer';
import { loggerMiddleware } from './middleware';
import { writePostReducer } from '../pages/write-post/write-post.reducer';
import { postTagReducer } from '../pages/posts/posts.reducer';
import { profileReducer } from '../pages/profile/profile.reducers';
import toastReducer from '../shared/components/toast/toast.reducer';

export type RootState = ReturnType<typeof rootReducer>;

export type RootAction = AnyAction;

export type RootThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, RootAction>;

export const rootReducer = combineReducers({
  auth: authReducer,
  detail: detailPostReducer,
  latestPost: lastesPostReducer,
  user: userReducer,
  writePost: writePostReducer,
  postTag: postTagReducer,
  profile: profileReducer,
  recommend: recommendPostReducer,
  bookmark: bookmarkReducer,
  toast: toastReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(loggerMiddleware, thunk)));

export default store;
