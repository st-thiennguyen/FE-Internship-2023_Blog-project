import { combineReducers } from 'redux';

import { detailReducer } from './detail.reducer';

export const rootReducer = combineReducers({
  detail: detailReducer,
});
