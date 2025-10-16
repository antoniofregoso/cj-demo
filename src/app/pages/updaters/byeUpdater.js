import { store } from "../../store/store";
import { setPageQuit } from "../..//store/slices/byeSlice"
/**
 * Manage changes in the home page state
 * @param {object} previousState 
 * @param {object} currentState 
 */ 
export function byeUpdater(previousState, currentState){
    let page = document.querySelector('app-page');
    
    if (previousState.context.lang!=currentState.context.lang||previousState.context.theme!=currentState.context.theme){
        page.data.context = currentState.context;
        page.loadData();
    }else if(previousState.bye.stage!=currentState.bye.stage){
        let track = currentState.bye.scrollStopping;
        let payload = {};
        switch (true){
            case currentState.bye.stage === 'quit':
                payload = page.setPageQuit(track.page);
                store.dispatch(setPageQuit(payload));
                break;
            }
        }
    } 