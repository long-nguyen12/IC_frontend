
import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers';

const Logger = createLogger();


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(Logger)
  
});

export default store;