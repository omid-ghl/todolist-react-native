import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';

import {api} from '@Services/api';

import navigation from './navigation';
import categories from './categories';

const reducers = combineReducers({
  navigation,
  categories,
  api: api.reducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware);
    return middlewares;
  },
});

setupListeners(store.dispatch);
export {store};
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
