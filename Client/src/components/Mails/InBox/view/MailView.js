import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import MailsContext from "../../../store/mails-context";
import { useLocation } from "react-router-dom";

const MailView = () => {
  const mailCtx = useContext(MailsContext);
  const location = useLocation();
  const path = location.pathname;
  const id = parseInt(path[path.length - 1]);
  const mail = mailCtx.inBox.find((item) => id === item.id && item);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short", year:'numeric' });
    return `${day} ${month}`;
  }

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
        {mail.subject}
      </Row>
    </Col>
  );
};

export default MailView;
