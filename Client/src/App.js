import React, { Fragment, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import MainHeader from "./components/Header/MainHeader";
import Home from "./components/Home/Home";
import Mail from "./components/Mails/Mail";
import { storeSenderMailsData } from "./components/store/mailSlice";
import { storeReceiverMailsData } from "./components/store/mailSlice";

function App() {
  const isLogin = useSelector(state => state.user.loginStatus);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(storeSenderMailsData(token));
  },[token, dispatch])

  useEffect(() => {
    dispatch(storeReceiverMailsData(token))
  }, [token, dispatch]);

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
        {!isLogin && <Redirect to='/login'/>}
      </Switch>
    </Fragment>
  );
}

export default App;
