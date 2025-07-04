

export function homeUpdater(previousValue, currentValue){
    let page = document.querySelector('app-page');
    
    if (previousValue.context.lang!=currentValue.context.lang||previousValue.context.theme!=currentValue.context.theme){
        page.data.context = currentValue.context;
        page.loadData();
    }else if(previousValue.home.stage!=currentValue.home.stage){
        switch (currentValue.home.stage){
            case 'action/open':
                page.querySelector(`#appoinment`).setAttribute('stage', 'open');
                break;
        }
    }
}