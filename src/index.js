/* eslint-disable import/no-extraneous-dependencies */
import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import invariant from "redux-immutable-state-invariant";
import reducers from "./reducers";
import App from "./components/App";
import { fetchFriends } from "./actions";

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

const store = createStore(
  reducers,
  compose(
    applyMiddleware(invariant(), thunk),
    devtoolMiddleware
  )
);

store.dispatch(fetchFriends());
render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
