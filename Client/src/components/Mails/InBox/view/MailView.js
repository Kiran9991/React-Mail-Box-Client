import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

const MailView = () => {
  const mails = useSelector(state => state.mail.inBox);
  const location = useLocation();
  const path = location.pathname;
  const id = parseInt(path[path.length - 1]);
  const mail = mails.filter((item) => id === item.id)[0];

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short", year:'numeric' });
    return `${day} ${month}`;
  }

  // console.log(mails);

  return (
    <Col xs={10}>
      <Row style={{ padding: "15px" }}>
        <Col sm={8} style={{ fontSize: "larger", fontWeight: "400" }}>
          {mail.sender}
        </Col>
        <Col sm={4} style={{ color: "#8b8585" }}>
          {formatDate(mail.updatedAt)}
        </Col>
      </Row>
      <Row
        style={{
          paddingLeft: "27px",
          paddingTop: "10px",
          paddingBottom: "10px",
          fontSize: "larger",
        }}
      >
        {mail.subject}
      </Row>
      <Row style={{ padding: "27px", fontFamily: "Arial, sans-serif" }}>
        {mail.message}
      </Row>
    </Col>
  );
};

export default MailView;
