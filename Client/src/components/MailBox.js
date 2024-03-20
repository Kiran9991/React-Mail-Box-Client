import { useContext } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import MailsContext from "./store/mails-context";
import { useHistory } from "react-router-dom";

const MailBox = () => {
  const mailsCtx = useContext(MailsContext);
  const history = useHistory();

  return (
    <Container
      className="bg-white w-200vh h-90vh rounded-3"
      style={{
        height: "90vh",
        marginTop: "0.2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          "justify-content": "space-between",
          padding: "5px",
        }}
      >
        <h2>Your MailsBox</h2>
        <Button variant="info" onClick={() => history.replace('/compose-mail')}>Compose Mail</Button>
      </div>
      <ListGroup>
        {mailsCtx.inBox.map((item) => (
          <ListGroup.Item key={item.id}>
            {item.receiverGmail} - {item.subject}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default MailBox;
