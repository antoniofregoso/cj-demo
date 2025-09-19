
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
        switch (currentState.home.stage){
            case 'atention/click':
                document.getElementById("action").scrollIntoView({ behavior: "smooth"});
                break;
            case 'escape':
                document.getElementById("message").setAttribute("active", "")
                break;
        }
    }
}


                            