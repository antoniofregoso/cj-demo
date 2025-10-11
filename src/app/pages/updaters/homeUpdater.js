import { store } from "../../store/store";
import { setScrollStopping } from "../../store/slices/homeSlice";
/**
 * Manage changes in the home page state
 * @param {object} previousState 
 * @param {objecy} currentState 
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
        console.log("Home stage changed to: ", currentState.home.stage);
        console.log('test*****************', page.scrollStopping)
        switch (currentState.home.stage){
            case 'atention/click':
                document.getElementById("action").scrollIntoView({ behavior: "smooth"});
                break;
            case 'attention/viewed':
                page.scrollStopping.sections.attention.start = Date.now();
                page.scrollStopping.sections.attention.views += 1;
                store.dispatch(setScrollStopping(page.scrollStopping));
                break;
            case 'interest/viewed':
                break;
            case 'desire/viewed':
                break;
            case 'action/viewed':
                break;
            case 'attention/unviewed':
                break;
            case 'interest/unviewed':
                break;
            case 'desire/unviewed':
                break;
            case 'action/unviewed':
                break;                
            case 'escape':
                document.getElementById("message").setAttribute("active", "")
                break;
            case 'quit':
                break;
        }
    }
}

