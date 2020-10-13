import React from "react";
import ReactDOM from "react-dom";
import "./assets/scss/style.scss";
import "./bootstrap.min.css";
import "./App.css";
import App from "./router";
import generateStore from "./redux";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={generateStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
