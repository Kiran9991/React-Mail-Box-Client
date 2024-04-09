import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function checkNum(str) {
  let num = "";
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(parseInt(str[i]))) {
      num += str[i];
    }
  }
  return parseInt(num);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${day} ${month}`;
}

const MailView = () => {
  const receivedMails = useSelector((state) => state.mail.inBox);
  const sentMails = useSelector((state) => state.mail.sendedMails);
  const location = useLocation();
  const path = location.pathname;
  const id = parseInt(checkNum(path));
  const mail = path.includes("inbox")
    ? receivedMails.find((item) => item.id === id)
    : sentMails.find((item) => item.id === id);

  return (
    <Col xs={10}>
      <Row style={{ padding: "15px" }}>
        <Col sm={8} style={{ fontSize: "larger", fontWeight: "400" }}>
          {path.includes('inbox') ? mail.sender : mail.receiver}
        </Col>
        <Col sm={4} style={{ color: "#8b8585", fontSize: "14px" }}>
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
