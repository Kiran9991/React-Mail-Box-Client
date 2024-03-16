import React, { Fragment, useContext } from "react";
import { Route, Switch } from "react-router-dom";

import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import MainHeader from "./components/Header/MainHeader";
import Home from "./components/Home";
import ComposeMail from "./components/ComposeMail";
import UserContext from "./components/user-context";

function App() {
  const userCtx = useContext(UserContext);
  const isLogin = userCtx.loginStatus;

  const token = localStorage.getItem('token');

  if(token) {
    userCtx.setLogin(true);
  }else {
    userCtx.setLogin(false);
  }

  getSenderMails();
  getReceiverMails();

  async function getSenderMails() {
    try {
      const res = await fetch('http://localhost:4000/composeMail/drafts', {
        method: 'GET',
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `${token}`
        },
      });

      const data = await res.json();

      console.log(data);
    } catch(error) {
      console.log(error);
    }
  }

  async function getReceiverMails() {
    try {
      const res = await fetch('http://localhost:4000/composeMail/mail-box', {
        method: 'GET',
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `${token}`
        },
      });

      const data = await res.json();

      console.log(data);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <MainHeader />
      <Switch>
        {!isLogin && <Route path="/signup">
          <Signup />
        </Route>}
        {!isLogin && <Route path="/login">
          <Login />
        </Route>}
        {isLogin && <Route path="/compose-mail">
          <ComposeMail />
        </Route>}
        {isLogin && <Route path="/">
          <Home />
        </Route>}
      </Switch>
    </Fragment>
  );
}

export default App;
