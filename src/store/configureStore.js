import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';

/**
 * Logs all actions and states after they are dispatched.
 */
const logger = createLogger();

function configureStoreProd(initialState) {
  const middlewares = [
    thunk,
    logger
  ];

  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
    )
  );
}

function configureStoreDev(initialState) {
  const middlewares = [
    reduxImmutableStateInvariant(),
    thunk,
    logger
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

/**
 * Test Store
 * 
 * Use this when your testing components
 * if state relies to store.
 * Ex: Submitting button and get state
 * from the store
 * 
 * @export
 * @param {any} initialState
 * @returns
 */
export function configureTestStore(initialState) {
  const middlewares = [
    thunk
  ];

  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
    )
  );
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
