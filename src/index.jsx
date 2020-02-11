import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/";
import { Provider } from "react-redux";
import { appReducer } from "./App/app.reducer";
import { buildStore } from "./redux";

const store = buildStore(appReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
