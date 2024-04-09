import { Col, ListGroup } from "react-bootstrap";
import inBox from "./InBox.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import SingleItem from "./Single Item/SingleItem";

const InBox = () => {
  const mails = useSelector((state) => state.mail.inBox);

  let content;

  if (mails.length > 0) {
    content = mails.map((item) => (
      <Link to={`/mail/inbox/${item.id}`} className="nav-link" key={item.id}>
        <SingleItem
          id={item.id}
          title={item.sender}
          subject={item.subject}
          date={item.createdAt}
          read={item.readByReceiver}
        />
      </Link>
    ));
  } else {
    content = <h4 className={inBox.empty}>Your inbox is Empty!</h4>;
  }

  return (
    <Col xs={10} style={{ padding: "0px 5px" }}>
      <div className={inBox.mainContent}>
        <h2>Inbox</h2>
      </div>
      <ListGroup>{content}</ListGroup>
    </Col>
  );
};

export default InBox;
