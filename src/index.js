/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { syncTranslationWithStore } from 'react-redux-i18n';

import configureStore from './store/configureStore';
import routes from './routes.js';
require('./favicon.ico');

import { updateContent } from './actions/contentActions';
import { loadLocalization } from './actions/languageActions';

// import lib css
import 'react-select/dist/react-select.css';
import 'react-datetime/css/react-datetime.css';

// import main css
import './style/_global.scss';

const store = configureStore();

// Load initial data
store.dispatch(updateContent());
// load localization
syncTranslationWithStore(store);
store.dispatch(loadLocalization());

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>, document.getElementById('app')
);
