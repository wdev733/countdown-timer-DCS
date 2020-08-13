/* eslint-disable import/default */
import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./components/App";
require("./favicon.ico"); // Tell webpack to load favicon.ico

render(
  <AppContainer>
    <App history={history} />
  </AppContainer>,
  document.getElementById("app")
);

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NewApp = require("./components/App").default;
    render(
      <AppContainer>
        <NewApp history={history} />
      </AppContainer>,
      document.getElementById("app")
    );
  });
}
