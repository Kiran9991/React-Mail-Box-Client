import { Col, ListGroup, Badge } from "react-bootstrap";
import inBox from "./InBox.module.css";
import { useContext } from "react";
import { Link } from "react-router-dom";

import MailsContext from "../../store/mails-context";

const InBox = () => {
  const mailsCtx = useContext(MailsContext);

  // console.log(mailsCtx.inBox);

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    return `${day} ${month}`;
  };

  return (
    <Col xs={10} id="main-content">
      <div className={inBox.mainContent}>
        <h2>Inbox</h2>
      </div>
      <ListGroup>
        {mailsCtx.inBox.map((item) => (
          <Link to={`/mail/inbox/${item.id}`} className='nav-link' key={item.id}>
            <ul className={inBox.mailUl}>
              <div className={inBox.mailDiv}>
                <div>{item.sender}</div>
                <div>{item.subject}</div>
              </div>
              <div>{formattedDate(item.updatedAt)}</div>
            </ul>
          </Link>
        ))}
      </ListGroup>
    </Col>
  );
};

export default InBox;
