import { useContext } from "react";
import { Container, ListGroup, Button, Row, Col} from "react-bootstrap";
import MailsContext from "./store/mails-context";
import { useHistory } from "react-router-dom";

const MailBox = () => {
  const mailsCtx = useContext(MailsContext);
  const history = useHistory();
  console.log(mailsCtx.inBox);

  return (
    <Container
      className="bg-white w-200vh h-90vh rounded-3"
      style={{
        height: "90vh",
        marginTop: "0.2rem",
      }}
    >
      <Row>
        {/* Side Bar */}
        <Col
          xs={2}
          id="sidebar"
          className="bg-light border-end"
          style={{ height: "34rem" }}
        >
          <Button
            style={{ marginTop: "10px", marginBottom: "10px" }}
            variant="info"
            onClick={() => history.replace("/compose-mail")}
          >
            Compose Mail
          </Button>
          <div
            style={{
              alignItems: "flex-start",
              flexDirection: "column",
              gap: "20px",
              display: "flex",
              justifyContent: "center",
              background: "#ddf7ff",
              borderRadius: "5px",
              padding: "20px",
            }}
          >
            <div
              style={{
                background: "aqua",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Inbox
            </div>
            <div>Unread</div>
            <div>Starred</div>
            <div>Draft</div>
            <div>Sent</div>
            <div>Archive</div>
            <div>Spam</div>
            <div>Deleted Items</div>
          </div>
        </Col>

        {/* Main content */}
        <Col xs={10} id="main-content">
          <div
            style={{
              display: "flex",
              "justify-content": "space-between",
              padding: "5px",
            }}
          >
            <h2>Your MailsBox</h2>
          </div>
          <ListGroup>
            {mailsCtx.inBox.map((item) => (
              <ListGroup.Item
                key={item.id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {item.receiverGmail} - {item.subject}{" "}
                <p style={{ marginBottom: "0px" }}>Timings</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default MailBox;
