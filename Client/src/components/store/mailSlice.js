import { createSlice } from '@reduxjs/toolkit';

const mailState = {
    inBox: [],
    sendedMails: []
}

const mailSlice = createSlice({
    name: 'mail',
    initialState: mailState,
    reducers: {
        updateInBox: (state, action) => {
            state.inBox = [...action.payload]
        },
        changeViewed: (state, action) => {
            const singleItem = state.inBox.find((item) => item.id === action.payload);
            singleItem.viewed = "1";
        },
        sendMails: (state, action) => {
            if(Array.isArray(action.payload)) {
                state.sendedMails = [...action.payload];
            }else {
                state.sendedMails.push(action.payload)
            }
        },
    }
})

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
