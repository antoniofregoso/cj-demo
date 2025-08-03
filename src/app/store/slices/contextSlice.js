import { createSlice } from '@reduxjs/toolkit';
import { generateSessionToken } from '@customerjourney/cj-core';
const contextSlice = createSlice({
    name: 'context',
    initialState:{
        lang:'es',
        theme:'light',
        sessionToken:generateSessionToken(32)
    },
    reducers:{
        setLanguaje:(state, action) => {
            state.lang = action.payload;
        },
        setTheme:(state, action) => {
            state.theme = action.payload;
            document.documentElement.setAttribute('data-theme', action.payload);
        }
    }
});

export const { setLanguaje,  setTheme } =  contextSlice.actions;
export default contextSlice.reducer;