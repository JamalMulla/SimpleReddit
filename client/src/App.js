import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./App/pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
        <ToastContainer />
      </div>
    );
    return <App />;
  }
}

export default App;
