import { Col, ListGroup, Badge } from "react-bootstrap";
import inBox from "./InBox.module.css";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";


import SingleItem from "../Single Item/SingleItem";

const InBox = () => {
  const mails = useSelector(state => state.mail.inBox);

  return (
    <Col xs={10} id="main-content">
      <div className={inBox.mainContent}>
        <h2>Inbox</h2>
      </div>
      <ListGroup>
        {mails.map((item) => (
          <Link to={`/mail/inbox/${item.id}`} className='nav-link' key={item.id}>
            <SingleItem item={item}/>
          </Link>
        ))}
      </ListGroup>
    </Col>
  );
};

export default InBox;
