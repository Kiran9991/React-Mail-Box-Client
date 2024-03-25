import { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { useHistory, Route, Switch, exact } from "react-router-dom";

import MailsContext from "../store/mails-context";
import SideBar from "./SideBar/SideBar";
import InBox from "./InBox/InBox";
import mail from "./Mail.module.css";
import ComposeMail from "./Compose/ComposeMail";
import MailView from "./InBox/view/MailView";

const Mail = () => {
  const mailsCtx = useContext(MailsContext);
  // console.log(mailsCtx.inBox);

  return (
    <Container className={mail.container}>
      <Row>
        <SideBar />
        <Switch>
        <Route path="/mail/inbox/:id" exact>
            <MailView/>
          </Route>
          <Route path="/mail/inbox">
            <InBox />
          </Route>
          <Route path="/mail/compose">
            <ComposeMail />
          </Route>
        </Switch>
      </Row>
    </Container>
  );
};

export default Mail;
