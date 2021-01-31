import React from "react";
import ReactDOM from "react-dom";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/index";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from 'redux-thunk';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(
  rootReducer, 
  composedEnhancer
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
