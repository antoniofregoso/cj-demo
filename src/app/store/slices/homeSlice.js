import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
    name: 'home',
    initialState:{
        context:{
            lang:'es'
        },
        journey:'attention',
        stage:'idle'
    },
    reducers:{
        setLanguaje:(state, action) => {
            console.log(action.payload)
            state.context.lang = action.payload;
        },
        setTheme:(state, action) => {
            console.log('hiy',  state.context.theme, action.payload)
            state.context.theme = action.payload;
            document.querySelector("html").setAttribute('data-theme', action.payload);
        }
    }
});

export const { setLanguaje, setTheme } =  homeSlice.actions;
export default homeSlice.reducer;