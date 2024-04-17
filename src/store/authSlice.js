// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    userData: null, // Additional data to be stored
 
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInSuccess: (state,action) => {
            const { token, data } = action.payload;
            // localStorage.setItem('token', token);
            sessionStorage.setItem('token', token);
            state.isAuthenticated = true;
            state.userData=data
        },
        signOutSuccess: (state) => {
            // localStorage.removeItem('token');
            sessionStorage.removeItem('token'); // Remove token from sessionStorage
            state.isAuthenticated = false;
            state.userData=null
        },
    },
});

export const { signInSuccess, signOutSuccess } = authSlice.actions;
export default authSlice.reducer;
