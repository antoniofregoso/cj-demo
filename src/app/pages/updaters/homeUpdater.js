
/**
 * Manage changes in the home page state
 * @param {object} previousValue 
 * @param {objecy} currentValue 
 */
export function homeUpdater(previousValue, currentValue){
    /**
     * Page instance
     * @type {object}
     */
    let page = document.querySelector('app-page');
     /**
     * If there are changes in language or theme, update the context and reload data.
     * If there are changes in the home stage, update the appoinment component accordingly.
     */
    if (previousValue.context.lang!=currentValue.context.lang||previousValue.context.theme!=currentValue.context.theme){
        page.data.context = currentValue.context;
        page.loadData();
    }else if(previousValue.home.stage!=currentValue.home.stage){
        let appoinment = page.querySelector('#appoinment');
        switch (currentValue.home.stage){
            case 'landing/click':
                document.getElementById("action").scrollIntoView({ behavior: "smooth"});
                break;
            case 'action/open':
               appoinment.setAttribute('stage', 'open');
                break;
            case 'action/close':
                appoinment.setAttribute('stage', 'awaiting');
                break;
            case 'action/appoinment':
                appoinment.setAttribute('stage', 'appoinment');
                break;
        }
    }
}