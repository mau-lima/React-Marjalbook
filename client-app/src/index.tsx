import React from "react";
import ReactDOM from "react-dom";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import { Action, applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/index";
import { Provider, useDispatch } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { IRootState } from "./app/modules/rootState";
import ScrollToTop from "./app/layout/ScrollToTop";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(rootReducer, composedEnhancer);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <ScrollToTop>
      <Provider store={store}>
          <App />
      </Provider>
      </ScrollToTop>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export type ReduxDispatch = ThunkDispatch<IRootState, any, Action>;
export function useThunkDispatch(): ReduxDispatch {
  return useDispatch<ReduxDispatch>();
}
