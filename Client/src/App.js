import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Signup from "./components/Auth/Signup/Signup";
import Login from "./components/Auth/Login/Login";
import MainHeader from "./components/Header/MainHeader";
import Home from "./components/Home/Home";
import Mail from "./components/Mails/Mail";
import { mailActions } from "./components/store/mail-slice";
import useFetch from "./components/custom hooks/useFetch";

function App() {
  const isLogin = useSelector((state) => state.user.loginStatus);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const sentMails = useFetch("http://localhost:4000/mail/sent", token);
  if (sentMails) {
    sentMails.sort((a, b) => b.id - a.id);
    dispatch(mailActions.sendMails(sentMails));
  }
  
  const receivedMails = useFetch("http://localhost:4000/mail/inbox", token);
  if (receivedMails) {
    receivedMails.sort((a, b) => b.id - a.id);
    dispatch(mailActions.updateInBox(receivedMails));
  }

  return (
    <Fragment>
      <MainHeader />
      <Switch>
        {!isLogin && (
          <Route path="/signup">
            <Signup />
          </Route>
        )}
        {!isLogin && (
          <Route path="/login">
            <Login />
          </Route>
        )}
        {isLogin && (
          <Route path="/mail">
            <Mail />
          </Route>
        )}
        {isLogin && (
          <Route path="/">
            <Home />
          </Route>
        )}
        {!isLogin && <Redirect to="/login" />}
      </Switch>
    </Fragment>
  );
}

export default App;
