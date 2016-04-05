import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import apiMiddleware from '../middlewares/api.js';

import rootReducer from '../reducers/root.js';

const loggerMiddleware = createLogger();

const middlewares = [
  thunkMiddleware,
  apiMiddleware,
];

if(process.env.NODE_ENV !== 'production') {
  middlewares.push(loggerMiddleware);
};

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares) // spread out the array.
  );
}
