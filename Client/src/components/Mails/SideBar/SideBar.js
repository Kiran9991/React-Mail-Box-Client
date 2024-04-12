import { Col, Button, ListGroup, Badge } from "react-bootstrap";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import sideBar from "./SideBar.module.css";

const SideBar = () => {
  const history = useHistory();
  const location = useLocation();
  const receivedMails = useSelector((state) => state.mail.inBox);
  const sentMails = useSelector((state) => state.mail.sendedMails);
  let mailsQuantity = receivedMails.length || "";
  let sentMailsQuantity = sentMails.length || "";

  const isActivePath = (path) => {
    return location.pathname.includes(path) ? sideBar.active : "";
  };

  const sideBarListItems = [
    { id: 1, to: "inbox", text: "InBox" },
    { id: 2, to: "unread", text: "Unread" },
    { id: 3, to: "sent", text: "Sent" },
    { id: 4, to: "draft", text: "Draft" },
    { id: 5, to: "starred", text: "Starred" },
    { id: 6, to: "spam", text: "Spam" },
    { id: 7, to: "deleted", text: "Deleted Items" },
  ];

  return (
    <Col xs={2} id="sidebar" className={sideBar.col}>
      <Button
        className={sideBar.composeButton}
        variant="info"
        onClick={() => history.replace("/mail/compose")}
      >
        Compose Mail
      </Button>
      <div className={sideBar.sidebarContent}>
        <ListGroup>
          {sideBarListItems.map((item) => (
            <div className={sideBar.ulText} key={item.id}>
              <Link
                to={`/mail/${item.to}`}
                className={`nav-link ${isActivePath(`/mail/${item.to}`)}`}
                key={item.id}
              >
                {item.text}
                {item.id === 1 && (
                  <Badge
                    bg="danger"
                    style={{ borderRadius: "30px", marginLeft: "2px" }}
                  >
                    {mailsQuantity}
                  </Badge>
                )}
                {item.id === 3 && (
                  <Badge
                    bg="danger"
                    style={{ borderRadius: "30px", marginLeft: "2px" }}
                  >
                    {sentMailsQuantity}
                  </Badge>
                )}
              </Link>
            </div>
          ))}
        </ListGroup>
      </div>
    </Col>
  );
};

export default SideBar;
