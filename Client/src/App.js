import React, { Fragment, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import MainHeader from "./components/Header/MainHeader";
import Home from "./components/Home/Home";
import Mail from "./components/Mails/Mail";
import { mailActions } from "./components/store/mailSlice";

function App() {
  const isLogin = useSelector(state => state.user.loginStatus);
  const mails = useSelector(state => state.mail.sendedMails);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function getSenderMails() {
      try {
        const res = await fetch('http://localhost:4000/mail/drafts', {
          method: 'GET',
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `${token}`
          },
        });
  
        const data = await res.json();
        dispatch(mailActions.sendMails(data.userMails));
      } catch(error) {
        console.log(error);
      }
    }
    getSenderMails();
  },[token, dispatch])

  useEffect(() => {
    async function getReceiverMails() {
      try {
        if(!token) return;
        const res = await fetch("http://localhost:4000/mail/mail-box", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
    
        const data = await res.json();
        const arrData = [...data.receiverMails];
        arrData.sort((a,b) => b.id - a.id);
        dispatch(mailActions.updateInBox(arrData));
      } catch (error) {
        console.log(error);
      }
    }
    getReceiverMails();
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
      </Switch>
    </Fragment>
  );
}

export default App;
