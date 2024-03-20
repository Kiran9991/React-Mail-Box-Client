import { createContext, useEffect, useState } from "react";

const MailsContext = createContext({
  inBox: [],
  setInBox: (mail) => {},
});

const MailsContextProvider = (props) => {
  const [mailBox, setMailBox] = useState([]);
  const token = localStorage.getItem('token');

  const setComposeMailHandler = (mail) => {
    setMailBox(() => [...mailBox, mail]);
  };

  const mails = {
    inBox: mailBox,
    setInBox: setComposeMailHandler,
  };

  useEffect(() => {
    async function getReceiverMails() {
      try {
        const res = await fetch("http://localhost:4000/composeMail/mail-box", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
    
        const data = await res.json();
        setMailBox(data.receiverMails);
      } catch (error) {
        console.log(error);
      }
    }
    getReceiverMails();
  }, [token]);

  return (
    <MailsContext.Provider value={mails}>
      {props.children}
    </MailsContext.Provider>
  );
};

export default MailsContext;

export { MailsContextProvider };
