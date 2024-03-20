import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { UserContextProvider } from "./components/store/user-context";
import "./index.css";
import App from "./App";
import { MailsContextProvider } from "./components/store/mails-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MailsContextProvider>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </MailsContextProvider>
);
