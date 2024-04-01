import { Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import SingleItem from "../InBox/InBox mails/Single Item/SingleItem";
import sent from "../InBox/InBox mails/InBox.module.css";

const Sent = () => {
  const sendedMails = useSelector((state) => state.mail.sendedMails);

  let content;
  
  if(sendedMails.length > 0) {
    content = sendedMails.map((item) => (
        <Link to={`/mail/sent/${item.id}`} className="nav-link" key={item.id}>
          <SingleItem
            id={item.id}
            title={item.receiver}
            subject={item.subject}
            date={item.createdAt}
            read={item.viewed}
          />
        </Link>
      ))
  }else {
    content = <h4 className={sent.empty}>You had not sended any mails!</h4>;
  }

  return (
    <Col xs={10} style={{ padding: "0px 5px" }}>
      <div className={sent.mainContent}>
        <h2>Sent</h2>
      </div>
      <ListGroup>
        {content}
      </ListGroup>
    </Col>
  );
};

export default Sent;
