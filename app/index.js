import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, hashHistory } from 'react-router';

import configureRoutes from './routes/configureRoutes.js'
import configureStore from './store/configureStore.js';

const store = confiugreStore();
const routeElement = document.getElementById('root');
const history = process.env.NODE_ENV !== 'production' ? hashHistory : browserHistory;

render(
  <Provider store={store}>
    { configureRoutes(history) }
  </Provider>,
  rootElement
)