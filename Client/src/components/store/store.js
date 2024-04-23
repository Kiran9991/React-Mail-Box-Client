import { configureStore } from '@reduxjs/toolkit';

import userSlice from './user-slice';
import mailSlice from './mail-slice';

const store = configureStore({
    reducer: {
        user: userSlice,
        mail: mailSlice
    }
})

export default store