import React, { Fragment, useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import MainHeader from "./components/Header/MainHeader";
import Home from "./components/Home/Home";
import ComposeMail from "./components/Mails/Compose/ComposeMail";
import UserContext from "./components/store/user-context";
import Mail from "./components/Mails/Mail";
import MailsContext from "./components/store/mails-context";

function App() {
  const userCtx = useContext(UserContext);
  const mailsCtx = useContext(MailsContext)
  const isLogin = userCtx.loginStatus;

  const token = localStorage.getItem('token');

  if(token) {
    userCtx.setLogin(true);
  }else {
    userCtx.setLogin(false);
  }

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
        {isLogin && <Route path="/mail">
          <Mail/>  
        </Route>}
        {isLogin && <Route path="/">
          <Home />
        </Route>}
      </Switch>
    </Fragment>
  );
}

export default App;
