import { Badge } from "react-bootstrap";
import inBox from "./SingleItem.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { mailActions } from "../../../../store/mailSlice";

const SingleItem = (props) => {
  const { item } = props;
  const mails = useSelector(state => state.mail.inBox);
  const dispatch = useDispatch();
  // console.log(mails);

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    return `${day} ${month}`;
  };

  const sendIsView = async () => {
    // console.log(item.id);
    const obj = { viewed: true };
    await fetch(`http://localhost:4000/composeMail/mail/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    dispatch(mailActions.changeViewed(item.id));
    // console.log(item)
  };

  return (
    <ul className={inBox.mailUl} onClick={sendIsView}>
      <div className={inBox.mailDiv}>
        <div>{item.viewed === "0" && <Badge bg="primary"> </Badge>}</div>
        <div className={item.viewed === "0" ? inBox.sender : ""}>
          {item.sender}
        </div>
        <div>{item.subject}</div>
      </div>
      <div className={inBox.date}>{formattedDate(item.createdAt)}</div>
    </ul>
  );
};

export default SingleItem;
