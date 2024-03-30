import { createSlice } from '@reduxjs/toolkit';

const userState = { loginStatus: false };

const userSlice = createSlice({
    name: 'user',
    initialState: userState,
    reducers: {
        setLoginStatus: (state, action) => {
            state.loginStatus = action.payload;
        }
    }
})

export const userActions = userSlice.actions; 

export default userSlice.reducer;