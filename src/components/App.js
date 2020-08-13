import React from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";

import Timer from "../containers/Timer";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <Timer />
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  history: PropTypes.object.isRequired,
};

export default hot(module)(App);
