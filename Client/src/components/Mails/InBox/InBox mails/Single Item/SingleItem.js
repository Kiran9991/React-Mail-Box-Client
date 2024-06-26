import { Badge } from "react-bootstrap";
import inBox from "./SingleItem.module.css";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { mailActions } from "../../../../store/mail-slice";
import formatDate from "../../../../custom hooks/formateDate";

const SingleItem = (props) => {
  const { id, title, read, date, subject } = props;
  const location = useLocation();
  const token = localStorage.getItem("token");
  let path = location.pathname;

  const dispatch = useDispatch();

  const markAsRead = async () => {
    const sendReadApi = async (obj) => {
      await fetch(`http://localhost:4000/mail/read/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
    };
    if (path.includes("inbox")) {
      sendReadApi({ readByReceiver: true });
      dispatch(mailActions.updateReceivedMailReadStatus(id));
    } else {
      sendReadApi({ readBySender: true });
      dispatch(mailActions.updateSentMailReadStatus(id));
    }
  };

  const deleteMailHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const sendDeleteApi = async (id) => {
      await fetch(`http://localhost:4000/mail/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
    };
    try {
      if (path.includes("inbox")) {
        sendDeleteApi(id);
        dispatch(mailActions.deleteReceivedMail(id));
      } else {
        sendDeleteApi(id);
        dispatch(mailActions.deleteSentMails(id));
      }
      alert(`Deleted ${title} mail`);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div
      className={!read ? inBox.mailUlActive : inBox.mailUl}
      onClick={markAsRead}
    >
      <div className={inBox.mailDiv}>
        <div style={{ marginLeft: "5px" }}>
          {!read && (
            <Badge bg="primary" style={{ padding: "6px" }}>
              {" "}
            </Badge>
          )}
        </div>
        <div className={!read ? inBox.sender : inBox.title}>{title}</div>
        <div className={inBox.subject}>{subject}</div>
      </div>
      <div className={inBox.mailRightSide}>
        <div>
          <button className={inBox.deleteBtn} onClick={deleteMailHandler}>
            Delete
          </button>
        </div>
        <div className={inBox.date}>{formatDate(date)}</div>
      </div>
    </div>
  );
};

export default SingleItem;
