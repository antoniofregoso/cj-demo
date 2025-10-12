import { createSlice } from '@reduxjs/toolkit';
/**
 * Home slice to manage the state of the home component, including stage and breadcrumb.
 */
const homeSlice = createSlice({
    name: 'home',
    initialState:{
        stage:'awaiting',
        scrollStopping:{
            page:{
                req:{},
                name:'',
                session:'',
                start:0,
                end:0,
                time:0,
                leavingApp:0,
                views:0
            },
        }
        
    },
    reducers:{
        setStage:(state, action) => {
            state.stage = action.payload;
        },
        setScrollStopping:(state, action) => {
            state.scrollStopping = action.payload;
        },
        setSectionTracking:(state, action) => {
            let section = Object.keys(action.payload)[0];
            state.scrollStopping.sections[section] = action.payload[section];
        }
    }
});

export const { setStage, setScrollStopping, setSectionTracking } =  homeSlice.actions;
export default homeSlice.reducer;