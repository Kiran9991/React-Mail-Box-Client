import { Badge } from "react-bootstrap";
import inBox from "./SingleItem.module.css";

const SingleItem = (props) => {
  const { item } = props;

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    return `${day} ${month}`;
  };

  const sendIsView = async () => {
    const obj = { viewed: true };
    await fetch(`http://localhost:4000/composeMail/mail/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
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
      <div className={inBox.date}>{formattedDate(item.updatedAt)}</div>
    </ul>
  );
};

export default SingleItem;
