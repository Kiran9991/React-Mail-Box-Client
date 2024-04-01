import { Badge } from "react-bootstrap";
import inBox from "./SingleItem.module.css";
import { useDispatch } from 'react-redux';
import { mailActions } from "../../../../store/mailSlice";

const SingleItem = (props) => {
  const { id, title, read, date, subject } = props;
  const dispatch = useDispatch();

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    return `${day} ${month}`;
  };

  const sendIsView = async () => {
    const obj = { viewed: true };
    await fetch(`http://localhost:4000/composeMail/mail/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    console.log(id)
    dispatch(mailActions.changeViewed(id));
  };

  return (
    <ul className={inBox.mailUl} onClick={sendIsView}>
      <div className={inBox.mailDiv}>
        <div>{read === "0" && <Badge bg="primary"> </Badge>}</div>
        <div className={read === "0" ? inBox.sender : ""}>
          {title}
        </div>
        <div>{subject}</div>
      </div>
      <div className={inBox.date}>{formattedDate(date)}</div>
    </ul>
  );
};

export default SingleItem;
