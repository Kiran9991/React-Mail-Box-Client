import { Container, Row } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";

import SideBar from "./SideBar/SideBar";
import InBox from "./InBox/InBox mails/InBox";
import mail from "./Mail.module.css";
import ComposeMail from "./Compose/ComposeMail";
import MailView from "./InBox/view/MailView";
import Sent from "./Sent/Sent";

const Mail = () => {
  return (
    <Container className={mail.container}>
      <Row>
        <SideBar />
        <Switch>
          <Route path="/mail/inbox/:id">
            <MailView />
          </Route>
          <Route path="/mail/inbox">
            <InBox />
          </Route>
          <Route path="/mail/sent/:id">
            <MailView />
          </Route>
          <Route path="/mail/sent">
            <Sent />
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
