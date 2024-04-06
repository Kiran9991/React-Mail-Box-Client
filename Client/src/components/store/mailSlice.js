import { createSlice } from "@reduxjs/toolkit";

const mailState = {
  inBox: [],
  sendedMails: [],
};

const mailSlice = createSlice({
  name: "mail",
  initialState: mailState,
  reducers: {
    updateInBox: (state, action) => {
      state.inBox = [...action.payload];
    },
    changeViewed: (state, action) => {
      const singleItem = state.inBox.find((item) => item.id === action.payload);
      singleItem.viewed = "1";
    },
    sendMails: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.sendedMails = [...action.payload];
      } else {
        state.sendedMails.push(action.payload);
      }
    },
    deleteReceivedMail: (state, action) => {
      state.inBox = state.inBox.filter((item) => item.id !== action.payload);
    },
    deleteSentMails: (state, action) => {
      state.sendedMails = state.sendedMails.filter((item) => item.id !== action.payload);
    }
  },
});

export const mailActions = mailSlice.actions;

export const storeSenderMailsData = (token) => {
  return async (dispatch) => {
    const getSenderMails = async () => {
      const res = await fetch("http://localhost:4000/mail/drafts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      const data = await res.json();
      dispatch(mailActions.sendMails(data.userMails));
    };
    try {
      await getSenderMails();
    } catch (error) {
      console.log(error);
      // alert(error);
    }
  };
};

export const storeReceiverMailsData = (token) => {
  return async(dispatch) => {
    const getReceiverMailsData = async () => {
      const res = await fetch("http://localhost:4000/mail/mail-box", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      const data = await res.json();
      const receivedMails = [...data.receiverMails || ''];
      receivedMails.sort((a, b) => b.id - a.id);
      dispatch(mailActions.updateInBox(receivedMails));
    };

    await getReceiverMailsData();

    try {
      getReceiverMailsData();
    } catch (error) {
      console.log(error);
    }
  };
};

export default mailSlice.reducer;
