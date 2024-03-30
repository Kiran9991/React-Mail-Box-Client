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
    }
})

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
