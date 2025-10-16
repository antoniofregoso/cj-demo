import { store } from "../../store/store";
import { setSectionTracking, setEscapeAttempt, setPageQuit } from "../../store/slices/homeSlice";
/**
 * Manage changes in the home page state
 * @param {object} previousState 
 * @param {object} currentState 
 */ 
export function homeUpdater(previousState, currentState){
    /**
     * Page instance
     * @type {object}
     */
    let page = document.querySelector('app-page');
    /**
     * If there are changes in language or theme, update the context and reload data.
     * If there are changes in the home stage, update the appoinment component accordingly.
     */
    if (previousState.context.lang!=currentState.context.lang||previousState.context.theme!=currentState.context.theme){
        page.data.context = currentState.context;
        page.loadData();
    }else if(previousState.home.stage!=currentState.home.stage){
        let track = currentState.home.scrollStopping;
        let payload = {};
        console.log(`Home stage changed to ${currentState.home.stage}`);
        switch (true){
            case currentState.home.stage === 'attention/click':
                document.getElementById("action").scrollIntoView({ behavior: "smooth"});
                break;
            case currentState.home.stage.startsWith('action/click-'):
                payload = page.setPageQuit(track.page);
                store.dispatch(setPageQuit(payload));
                window.location.href = `/#thanks?product=${currentState.home.stage.match(/click-([\w-]+)$/)?.[1]}`
                break;
            case currentState.home.stage === 'atenttion/viewed':
                payload = page.setSectionViewed('attention',track.sections.attention);
                store.dispatch(setSectionTracking(payload));
                break;
            case currentState.home.stage === 'interest/viewed':
                payload = page.setSectionViewed('interest',track.sections.interest);
                store.dispatch(setSectionTracking(payload));
                break;
            case currentState.home.stage === 'desire/viewed':
                payload = page.setSectionViewed('desire',track.sections.desire);
                store.dispatch(setSectionTracking(payload));
                break;
            case currentState.home.stage === 'action/viewed':
                payload = page.setSectionViewed('action',track.sections.action);
                store.dispatch(setSectionTracking(payload));
                break;
            case currentState.home.stage === 'attention/unviewed':
                payloasd = page.setSectionUnviewed('attention',track.sections.attention);
                store.dispatch(setSectionTracking(payload));
                break;
            case currentState.home.stage === 'interest/unviewed':
                payload = page.setSectionUnviewed('interest',track.sections.interest);
                store.dispatch(setSectionTracking(payload));
                break;
            case currentState.home.stage === 'desire/unviewed':
                payload = page.setSectionUnviewed('desire',track.sections.desire);
                store.dispatch(setSectionTracking(payload));
                break;
            case currentState.home.stage === 'action/unviewed':
                payload = page.setSectionUnviewed('action',track.sections.action);
                store.dispatch(setSectionTracking(payload));
                break;                
            case currentState.home.stage === 'escape':
                let leavingApp = track.page.leavingapp + 1;
                store.dispatch(setEscapeAttempt(leavingApp));
                if (leavingApp===1){
                    document.getElementById("message").setAttribute("active", "")
                }
                break;
            case currentState.home.stage === 'quit':
                payload = page.setPageQuit(track.page);
                store.dispatch(setPageQuit(payload));
                break;
        }
    }
}

