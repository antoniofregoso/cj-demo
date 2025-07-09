

export function homeUpdater(previousValue, currentValue){
    let page = document.querySelector('app-page');
    
    if (previousValue.context.lang!=currentValue.context.lang||previousValue.context.theme!=currentValue.context.theme){
        page.data.context = currentValue.context;
        page.loadData();
    }else if(previousValue.home.stage!=currentValue.home.stage){
        let appoinment = page.querySelector('#appoinment');
        switch (currentValue.home.stage){
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