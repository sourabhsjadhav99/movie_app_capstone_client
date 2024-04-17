// src/features/auth/bookmarkSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userBookmarkData: null, // Additional data to be stored
 
};

const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState,
    reducers: {
        bookmarkData: (state,action) => {
            const {data } = action.payload;
            state.userBookmarkData=data
        },
 
    },
});

export const { bookmarkData} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
