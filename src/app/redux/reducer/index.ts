import { combineReducers } from 'redux';

import { detailReducer } from './detail.reducer';
import { postReducer } from './post';

export const rootReducer = combineReducers({
  detail: detailReducer,
  post: postReducer,
});
