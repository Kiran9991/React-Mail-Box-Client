import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');

const userState = { loginStatus: token ? true : false };

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