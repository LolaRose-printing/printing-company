import { applyMiddleware, compose, createStore } from 'redux';
import { push, routerMiddleware } from 'connected-react-router';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';

import userActions from './actions/user';
import createRootReducer from './reducers/root';

export default function configureStore(initialState, routerHistory) {
  const router = routerMiddleware(routerHistory);

  const actionCreators = {
    ...userActions,
    push,
  };

  const middlewares = [thunk, router];

  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (process.env.NODE_ENV === 'development' && compose_) {
      return compose_({ actionCreators });
    }
    return compose;
  })();

  const persist = false;
  const enhancer = persist
    ? composeEnhancers(applyMiddleware(...middlewares), persistState())
    : composeEnhancers(applyMiddleware(...middlewares));

  const rootReducer = createRootReducer(routerHistory);

  return createStore(rootReducer, initialState, enhancer);
}
