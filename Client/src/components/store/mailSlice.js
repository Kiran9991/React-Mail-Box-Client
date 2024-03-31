import { createSlice } from '@reduxjs/toolkit';

const mailState = {
    inBox: []
}

const mailSlice = createSlice({
    name: 'mail',
    initialState: mailState,
    reducers: {
        sendMail: (state, action) => {
            if(Array.isArray(action.payload)) {
                state.inBox = [...action.payload]
            }else {
                state.inBox.push(action.payload);
            }
        },
        changeViewed: (state, action) => {
            const singleItem = state.inBox.find((item) => item.id === action.payload);
            singleItem.viewed = "1";
        }
    }
})

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
