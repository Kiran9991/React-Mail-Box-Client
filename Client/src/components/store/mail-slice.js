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
    updateReceivedMailReadStatus: (state, action) => {
      const singleItem = state.inBox.find((item) => item.id === action.payload);
      singleItem.readByReceiver = true;
    },
    updateSentMailReadStatus: (state, action) => {
      const singleItem = state.sendedMails.find((item) => item.id === action.payload);
      singleItem.readBySender = true;
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

export default mailSlice.reducer;
