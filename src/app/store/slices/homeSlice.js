import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
    name: 'home',
    initialState:{
        stage:'awaiting',
        breadcrumb:[]
        
    },
    reducers:{
        setStage:(state, action) => {
            state.stage = action.payload;
        },
        setBreadcrumb:(state, action) => {
            state.breadcrumb = action.payload;
        }
    }
});

export const { setStage, setBreadcrumb } =  homeSlice.actions;
export default homeSlice.reducer;