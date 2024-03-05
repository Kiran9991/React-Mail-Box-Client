import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import MainHeader from "./components/MainHeader";

function App() {
  return (
    <Fragment>
      <MainHeader/>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Fragment>
  );
}

export default App;
