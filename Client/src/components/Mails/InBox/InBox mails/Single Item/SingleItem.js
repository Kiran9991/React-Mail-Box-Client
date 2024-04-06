import { Badge } from "react-bootstrap";
import inBox from "./SingleItem.module.css";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { mailActions } from "../../../../store/mailSlice";

const SingleItem = (props) => {
  const { id, title, read, date, subject } = props;
  const location = useLocation();
  const token = localStorage.getItem("token");
  let path = location.pathname;

  const dispatch = useDispatch();

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", {
      month: "short",
      hour: "2-digit",
      minute: "numeric",
    });
    return `${day} ${month}`;
  };

  const sendIsView = async () => {
    const obj = { viewed: true };
    const sendReadApi = async () => {
      await fetch(`http://localhost:4000/mail/mail-view/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
    };
    if (path.includes("inbox")) {
      sendReadApi();
      dispatch(mailActions.changeViewed(id));
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
      className={read === "0" ? inBox.mailUlActive : inBox.mailUl}
      onClick={sendIsView}
    >
      <div className={inBox.mailDiv}>
        <div>{read === "0" && <Badge bg="primary"> </Badge>}</div>
        <div className={read === "0" ? inBox.sender : inBox.title}>{title}</div>
        <div className={inBox.subject}>{subject}</div>
      </div>
      <div className={inBox.mailRightSide}>
        <div>
          <button className={inBox.deleteBtn} onClick={deleteMailHandler}>
            Delete
          </button>
        </div>
        <div className={inBox.date}>{formattedDate(date)}</div>
      </div>
    </div>
  );
};

export default SingleItem;
