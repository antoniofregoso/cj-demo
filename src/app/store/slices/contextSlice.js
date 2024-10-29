import { createSlice } from '@reduxjs/toolkit';

const contextSlice = createSlice({
    name: 'context',
    initialState:{
        lang:'es',
        theme:'light'
    },
    reducers:{
        setLanguaje:(state, action) => {
            state.lang = action.payload;
        },
        setTheme:(state, action) => {
            state.theme = action.payload;
            document.querySelector("html").setAttribute('data-theme', action.payload);
        }
    }
});

export const { setLanguaje,  setTheme } =  contextSlice.actions;
export default contextSlice.reducer;