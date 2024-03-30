import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import mailSlice from './mailSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        mail: mailSlice
    }
})

export default store