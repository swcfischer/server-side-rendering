import "babel-polyfill";
import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import axios from 'axios'
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { renderRoutes } from "react-router-config";

const axiosInstance = axios.create({
  baseURL: "/api"
})

const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

import routes from "./routes";

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
