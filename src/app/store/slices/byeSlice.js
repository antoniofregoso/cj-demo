import { createSlice } from '@reduxjs/toolkit';

const byeSlice = createSlice({
    name: 'bye',
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

export const { setStage, setBreadcrumb } =  byeSlice.actions;
export default byeSlice.reducer;